import { SearchCityForm } from "../components";

const NoMatch = () => (
  <div>
    <SearchCityForm />
    <div className="d-flex justify-content-center mt-5">
      <h3>Strona 404 - nie znaleziono lokalizacji</h3>
    </div>
  </div>
);

export default NoMatch;
