export default defineNuxtRouteMiddleware(() => {
    const token = useCookie("AccessToken");
    if (!token.value) {
        return navigateTo("/");
    }
});
