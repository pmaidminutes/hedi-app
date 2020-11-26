import { IContentEntry } from "@/modules/search/types";

const DEFAULT_PLACEHOLDER_IMAGE = "../logo.svg";

interface IProps {
  result: IContentEntry;
  // any other props that come into the component
}
export function ResultUser({ result }: IProps) {
  /* var user:SSearchResult = result
  var img_uri =
  user.ss_uri === "" ? DEFAULT_PLACEHOLDER_IMAGE : user.ss_uri;
    if(img_uri!==undefined)
     img_uri = (img_uri).replace("public://","");
     var url = user.site+ user.ss_search_api_id.split(/[ :]+/)[1];
  return (  
    <div>
      <ccr.Link inline href={url}> <h3 style={{ margin: '30px 0 10px' }}>{user.tm_X3b_en_name}</h3></ccr.Link>
       {/*  <img
          width="200"
          alt={`Connect with : ${user.ss_name}`}
          src={`http://drupal.docker.localhost:8888/sites/default/files/${img_uri}`}
        /> }
      <p>{user.tm_X3b_en_name} available from {user.ds_field_due_date}</p>
      <p>{user.field_languages_known!== undefined ?user.field_languages_known.join(","):""}</p>
      <p>{user.tm_X3b_en_field_expertise!==undefined?user.tm_X3b_en_field_expertise.join(","):""}</p>
      <p>{user.tm_X3b_en_field_about_me}</p>
    </div>
  ); */
}
