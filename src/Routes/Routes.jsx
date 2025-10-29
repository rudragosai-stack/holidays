import { createBrowserRouter } from "react-router";
import AboutPage from "../Pages/AboutPage";
import Layout2 from "../Layout/Layout2";
import Home4 from "../Pages/Home4";
import DestinationPage from "../Pages/DestinationPage";
import DestinationDetailsPage from "../Pages/DestinationDetailsPage";
import TourPage from "../Pages/TourPage";
import TourDetailsPage from "../Pages/TourDetailsPage";
import ContactPage from "../Pages/ContactPage";
import StudioRedirect from "../Components/Studio/StudioRedirect";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout2,
    children: [
      {
        index: true,
        Component: Home4,
      },
      {
        path: "/about",
        Component: AboutPage,
      },
      {
        path: "/destination",
        Component: DestinationPage,
      },
      {
        path: "/destination/destination-details",
        Component: DestinationDetailsPage,
      },
      {
        path: "/tour",
        Component: TourPage,
      },
      {
        path: "/tour/domestic",
        Component: TourPage,
      },
      {
        path: "/tour/international",
        Component: TourPage,
      },
      {
        path: "/tour/tour-details",
        Component: TourDetailsPage,
      },
      {
        path: "/tour/:slug",
        Component: TourDetailsPage,
      },
      {
        path: "/contact",
        Component: ContactPage,
      },
      {
        path: "/studio",
        Component: StudioRedirect,
      },
    ],
  },
]);
