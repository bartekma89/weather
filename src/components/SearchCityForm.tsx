import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  InputGroup,
  FormFeedback,
  FormGroup,
} from "reactstrap";

import { fetchCityWeatherData } from "../actions/cityWeather.action";
import { useHistory } from "react-router";

const SearchCityForm = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const isValidateForm = (value: string) => {
    let valueError = "";
    if (!value) {
      valueError = "Field is required";
    } else {
      valueError = "";
    }

    if (valueError) {
      setError(valueError);
      return false;
    }

    setError(valueError);
    return true;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    isValidateForm(event.target.value);

    setValue(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValidateForm(value)) {
      try {
        await dispatch(fetchCityWeatherData(value));
        setValue("");
        localStorage.setItem("city", value);
        history.push(`/city/${value}`);
      } catch {
        history.push(`/${value}`);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center mt-4">
        <Col md="8">
          <FormGroup>
            <InputGroup>
              <Input
                type="text"
                name="city"
                value={value}
                onChange={handleChange}
                placeholder="London, Warsaw, etc."
                invalid={!!error}
              />

              <Button color="primary" type="submit">
                Search city
              </Button>
              <FormFeedback>{error}</FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchCityForm;
