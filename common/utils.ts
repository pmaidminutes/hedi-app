
/* --- dev helper functions --- */
export function AssertClientSide() {
  return (typeof window !== 'undefined');
}

export function AssertServerSide() {
  return (typeof window === 'undefined');
}