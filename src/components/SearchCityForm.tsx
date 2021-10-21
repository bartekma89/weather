import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  FormGroup,
  Col,
  Row,
  InputGroup,
} from "reactstrap";

import { fetchCityWeatherData } from "../actions/cityWeather.action";
import { useHistory } from "react-router";

const SearchCityForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(fetchCityWeatherData(value));
      setValue("");
      localStorage.setItem("city", value);
      history.push(`/city/${value}`);
    } catch {
      history.push(`/${value}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center mt-4">
        <Col md="8">
          <InputGroup>
            <Input
              type="text"
              name="city"
              value={value}
              onChange={handleChange}
              placeholder="London, Warsaw, etc."
            />
            <Button color="primary" type="submit">
              Search city
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchCityForm;
