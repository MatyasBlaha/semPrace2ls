
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
    locales: ["en", "cz"],
    defaultLocale: "cz",
})

export const config = {
    matcher: ["/", "/(cz|en)/:path*"],
}
