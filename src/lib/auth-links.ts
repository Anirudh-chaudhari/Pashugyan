export function buildSignUpHref(redirectTo = "/dashboard") {
  return `/sign-up?redirectTo=${encodeURIComponent(redirectTo)}`;
}
