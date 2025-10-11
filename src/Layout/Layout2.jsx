import { Outlet, useLocation } from "react-router";
import Footer1 from "../Components/Footer/Footer1";
import Header1 from "../Components/Header/Header1";
import SEOHead from "../Components/SEO/SEOHead";
import { getTravelAgencySchema, getWebSiteSchema } from "../Components/SEO/StructuredData";
import { getPageSEO } from "../lib/seo-config";

const Layout2 = () => {
  const location = useLocation();

  const currentSEO = getPageSEO(location.pathname);
  const structuredData = [getTravelAgencySchema(currentSEO.url), getWebSiteSchema(currentSEO.url)];

  return (
    <div className="main-page-area2">
      <SEOHead
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        url={currentSEO.url}
        image={currentSEO.image}
        structuredData={structuredData}
      />
      <Header1></Header1>
      <Outlet></Outlet>
      <Footer1></Footer1>
    </div>
  );
};

export default Layout2;
