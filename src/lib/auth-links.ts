export function buildSignUpHref(redirectTo = "/detect") {
  return `/sign-up?redirectTo=${encodeURIComponent(redirectTo)}`;
}
