# HEDI Search Module

implements solr search for drupal CMS content

# Solr Search set up on Drupal
## Drupal Server used appstaging.projekt-hedi.de in digital cloud
### docker image slim is used to have reduced space

1. Set up Solr with the image solr:slim is used for docker, `docker-compose up -d`
2. Container *HEDI_CMS_solr* should be created as per the docker-compose file. Check using `docker ps`
3. Login to the container with the command `docker exec -it HEDI_CMS_solr bash` in the server terminal
4. Copy the configsets, as this version of Solr image installable stores the configset in the wrong location and this step is applicable only for the docker image (solr:slim). For future upgraded Solr versions, this step may not be required. We need only the *_default* configset folder `cp -r /opt/solr/server/solr/configsets /var/solr/data/configsets`
5. Launch Solr admin portal using `http://solr.projekt-hedi.de/` enter the required credentials, do not create the core manually in the UI, instead follow the next step
6. To create the actual core we need to create temporary core (this  temporary step is required when there is no configset available in Solr use *_default* to create core and then download the configset to create the actual core. Or use the actual configset provided by the installable and skip to the 12th step) `http://solr.projekt-hedi.de/solr/admin/cores?action=CREATE&name=suche&configSet=_default`
7. Select the core in the admin portal *Core Selector* dropdown and ensure it is created. In this case the core listed should be "suche"
8. In the Drupal application enable *Search API Solr* module. if it already enabled, disable it and then re-enable it. it is better to have it disabled before creating solr core
9. Go to `Drupal > Configuration > Search and Metadata >>. Search API`. Or Using the url `https://appstaging.projekt-hedi.de/en/admin/config/search/search-api`
    - A. Click to Add Server, Enter the server name *Hedi Solr* 
    - B. Backend selected as “Solr”
    - C. Select “Standard” in Configure SOLR backend
    - D. Enter Solr host as *solr*
    - E. Enter the core name in “Solr Core” in this case it is *suche* as mentioned in step 6
    - F. Click save; On save server status should be “enabled”, Server and Core connection should read “reachable”

10. Click to Add index in `Drupal > Configuration > Search and Metadata >>. Search API`. Or Using the url `https://appstaging.projekt-hedi.de/en/admin/config/search/search-api`
    * A. Enter the index name *Search* 
    * B. Select the Datasources to be indexed
        - Content
        - Taxonomy term
        - User

    * C. Select Server *Hedi Solr* as in step 9A and then save
    * D. In the Index, navigate to “Fields” tab add the following fields with the appropriate Type, the type can be modified after adding fields too. Click to save
        - Content : 
        - Body : Full Text
        - Categories : Full Text
        - Tags : Full Text
        - Tags : Full Text
        - Title : Full Text
        - Taxonomy Term
        - Description
        - Term ID
        - Term Parents
        - User
        - Role?
        - Name?
    * E. In the Processors tab, select the below and click save. Processor ORDER is automatically arranged, ensure the following though
        - HTML Filter
    * F. After completing the steps A to E, Click Index now, this should index all the data specified
11. Now Open Solr, select the core and select Query tab or click the link `http://solr.projekt-hedi.de/solr/#/suche/query` Execute Query for the handler `/select` should return the Drupal content that are indexed.
12. It is necessary to synchronize config files of Drupal and Solr, so do the below steps now and create the core “search”.
    - a. Now login to the Drupal container and execute to get the config files. (8.6.3 is the Solr version and hedi_solr is the machine name for the Solr configured for drupal, you can find this in “view” tab of Search API server) `drush solr-gsc hedi_solr config.zip 8.6.3`
    - b.*config.zip* can be found in `/app/web` (if not execute `find . -iname config.zip` to locate it)
    - c. Exit the Drupal container, and copy the config zip to the host: `docker cp HEDI_CMS_drupal:/app/web/config.zip /tmp/config`
    - d. Navigate to `/tmp/config` and execute `unzip config.zip` and then `rm config.zip`
    - e. From the host of the container `docker cp /tmp/config/. HEDI_CMS_solr:/var/solr/data/configsets/suche-conf/conf ` note: create folder structure in the container before executing the command
    - f. Create the actual core *search* `http://solr.projekt-hedi.de/solr/admin/cores?action=CREATE&name=search&configSet=suche-conf`
    - g. Delete the temporary core *suche* `http://solr.projekt-hedi.de/solr/admin/cores?action=UNLOAD&core=suche&deleteIndex=true&deleteDataDir=true&deleteInstanceDir=true` 
    - h. Update the core name in Drupal server and re-index the same
13. Add the below changes in xml  in `/var/solr/data/configsets/suche-conf/conf`

    * after the last <field> tag in `schema.xml` 
    ``` xml
    <field name="voll" type="text_und" stored="true" indexed="true" multiValued="true" /> 
    ```
    * in "schema_extra_fields.xml"
    ```xml
    <copyField source="tm_X3b_en_*" dest="voll" /> 
    ```
14. In solrconfig_extra.xml for _autocomplete_ feature to work, update the sub-tag terms as *true* `<str name="terms">true</str>`
15. Reload the core in core admin and re-index to find the data in newly created dynamic field _voll_
16. Only if required For CORS enabling add below in. *solr-x.x.x/server/solr-webapp/webapp/WEB-INF/web.xml* immediately after the <web-app> tag and restart the Solr container and reload the core.
```xml
<filter> 
    <filter-name>cross-origin</filter-name>
    <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
    <init-param>
        <param-name>allowedOrigins</param-name>
        <param-value>*</param-value>
    </init-param>
    <init-param>
        <param-name>allowedMethods</param-name>
        <param-value>GET,POST,OPTIONS,DELETE,PUT,HEAD</param-value>
    </init-param>
    <init-param>
        <param-name>allowedHeaders</param-name>
        <param-value>origin, content-type, accept</param-value>
    </init-param>
</filter>

<filter-mapping>
  <filter-name>cross-origin</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```

17. Voila its done [:)]
