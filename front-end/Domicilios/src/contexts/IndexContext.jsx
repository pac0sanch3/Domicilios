import { AuthProvider } from "./AuthContext";
import { GlobalDataProvider } from "./FetchDataGlobalContext";
import PropTypes from "prop-types";

export const ProviderContext = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalDataProvider>
        {children}
      </GlobalDataProvider>
    </AuthProvider>
  );
};

ProviderContext.propTypes = {
  children: PropTypes.element,
};
