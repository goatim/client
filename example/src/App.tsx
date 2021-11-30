import { ReactElement } from 'react';
import './App.scss';
import {
  PlaceInput,
  PlaceValue,
  Button,
  Select,
  DatePicker,
  standardsTimeSlots,
} from '@fleuraison/ui';
import { Field, Form } from '@cezembre/forms';
import { useGoogleMapsApi, usePlacesService } from '@cezembre/fronts';

export default function App(): ReactElement {
  console.log(process.env.REACT_APP_GOOGLE_CLOUD_API_KEY || '');
  useGoogleMapsApi(process.env.REACT_APP_GOOGLE_CLOUD_API_KEY || '');
  usePlacesService();

  return (
    <div className="App">
      <div className="buttons">
        <div className="line">
          <div>
            <Button disabled styleType="filled" leftIcon="arrow-left" rightIcon="user">
              Enregistrer
            </Button>
          </div>
          <div>
            <Button styleType="outlined">Enregistrer</Button>
          </div>
          <div>
            <Button styleType="text">Enregistrer</Button>
          </div>
          <div>
            <Button styleType="link">Enregistrer</Button>
          </div>
        </div>
        <div className="line">
          <div>
            <Button styleType="filled" theme="lead" disabled>
              Enregistrer
            </Button>
          </div>
          <div>
            <Button styleType="outlined" theme="lead">
              Enregistrer
            </Button>
          </div>
          <div>
            <Button styleType="text" theme="lead">
              Enregistrer
            </Button>
          </div>
          <div>
            <Button styleType="link" theme="lead" leftIcon="arrow-left">
              Enregistrer
            </Button>
          </div>
        </div>
        <div className="line">
          <div>
            <Button disabled styleType="filled" theme="alert">
              Enregistrer
            </Button>
          </div>
          <div>
            <Button styleType="outlined" theme="alert">
              Enregistrer
            </Button>
          </div>
          <div>
            <Button styleType="text" theme="alert">
              Enregistrer
            </Button>
          </div>
          <div>
            <Button styleType="link" theme="alert">
              Enregistrer
            </Button>
          </div>
        </div>
        <div className="line">
          <div>
            <Button styleType="filled" theme="validate">
              Enregistrer
            </Button>
          </div>
          <div>
            <Button styleType="outlined" theme="validate">
              Enregistrer
            </Button>
          </div>
          <div>
            <Button styleType="text" theme="validate">
              Enregistrer
            </Button>
          </div>
          <div>
            <Button styleType="link" theme="validate">
              Enregistrer
            </Button>
          </div>
        </div>
      </div>
      <Form className="form">
        <div className="field">
          <Field name="wished_date" component={DatePicker} fullWidth leftIcon="calendar" />
        </div>

        <div className="field">
          <Field
            name="wished_time_slot"
            component={Select}
            fullWidth
            options={standardsTimeSlots.map((standardTimeSlot) => ({
              label: standardTimeSlot.label,
              value: standardTimeSlot.value,
            }))}
          />
        </div>

        <div className="field">
          <Field<PlaceValue> name="address" component={PlaceInput} />
        </div>

        <div className="submit">
          <Button type="submit">Ajouter au panier</Button>
        </div>
      </Form>
    </div>
  );
}
