// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AdminSideBar from '../components/AdminSidebar';

import { Box, TextField, Button, Divider, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid2';

interface FormData {
  lodgingOption: 'resortView' | 'partialOceanView';
  amenities: {
    specialDinner: boolean;
    meetGreet: boolean;
    tennisClass: boolean;
  };
  agreePolicy: boolean;
  agreeTerms: boolean;
}

const lodgingOptions = {
  resortView: 1200,
  partialOceanView: 519
};

const amenitiesOptions = {
  specialDinner: 50,
  meetGreet: 50,
  tennisClass: 100
};

const TAX_RATE = 0.0654;

export default function BookGetaway() {
  const { handleSubmit, control, formState: { errors }, watch } = useForm<FormData>();
  const navigate = useNavigate();

  const lodgingOption = watch('lodgingOption');
  const amenities = watch('amenities', { specialDinner: false, meetGreet: false, tennisClass: false });

  const calculateTotal = () => {
    let total = 0;
    if (lodgingOption && lodgingOptions[lodgingOption]) {
      total += lodgingOptions[lodgingOption];
    }
    if (amenities.specialDinner) total += amenitiesOptions.specialDinner;
    if (amenities.meetGreet) total += amenitiesOptions.meetGreet;
    if (amenities.tennisClass) total += amenitiesOptions.tennisClass;
    const taxes = total * TAX_RATE;
    return { total: total + taxes, taxes };
  };

  const onSubmit = (data: FormData) => {
    const { total, taxes } = calculateTotal();
    const formDataWithTotal = { ...data, total, taxes };

    //localStorage
    localStorage.setItem('selectedData', JSON.stringify(formDataWithTotal));
    navigate('/payment');
  };

  const { total, taxes } = calculateTotal();

  return (
    <>
      <Grid container rowSpacing={1} mt={9} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={{ xs:2 }}>
          <AdminSideBar />
        </Grid>
        <Grid size={{ xs:10 }} spacing={2} className='section blueBg'>
          <h2 className='title'>Getaway reservation</h2>
          <Box sx={{ width: 1000, maxWidth: '100%', padding: '7px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h5 className='purpleLabel'>Payment & contact info</h5>
              <TextField
                label="Player Name"
                fullWidth
                margin="dense"
                defaultValue=""
                disabled
              />
              <TextField
                label="Email"
                fullWidth
                margin="dense"
                defaultValue=""
                disabled
              />
              <TextField
                label="Cellphone"
                fullWidth
                margin="dense"
                defaultValue=""
                disabled
              />
              <TextField
                label="Address"
                fullWidth
                margin="dense"
                defaultValue=""
                disabled
              />
              <br />
              <h5 className='purpleLabel'>Lodging Options*</h5>
              <Divider aria-hidden="true" sx={{ bgcolor: '#00E392' }} />
              <Controller
                name="lodgingOption"
                control={control}
                defaultValue="resortView"
                rules={{ required: 'Please select a Lodging option' }}
                render={({ field }) => (
                  <RadioGroup {...field} aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                    <FormControlLabel value="resortView" control={<Radio />} label="$1200+tax/person Double Occupancy for a Resort View Room" />
                    <FormControlLabel value="partialOceanView" control={<Radio />} label="$519+tax/person Double Occupancy for Partial Ocean View Room" />
                  </RadioGroup>
                )}
              />
              {errors.lodgingOption && <p style={{ color: 'red' }}>{errors.lodgingOption.message}</p>}

              <h5 className='purpleLabel'>Add Ons (Optional)</h5>
              <Divider aria-hidden="true" sx={{ bgcolor: '#00E392' }} />
              <Controller
                name="amenities.specialDinner"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Saturday's special dinner $50"
                  />
                )}
              />
              <br/>
              <Controller
                name="amenities.meetGreet"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Meet & greet with Stan Wawrinka $50"
                  />
                )}
              />
              <br/>
              <Controller
                name="amenities.tennisClass"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Tennis class with Stan Wawrinka $100"
                  />
                )}
              />
              <br/><br/>
              <h5 className='purpleLabel'>Payment Details</h5>
              <Divider aria-hidden="true" sx={{ bgcolor: '#00E392' }} />
              <p>Taxes: ${taxes.toFixed(2)} USD</p>
              <p>Total: ${total.toFixed(2)} USD</p>
              <p>*The total charged on the next page will be the price quoted above.</p>

              <h3 className='purpleLabel'>Policies*</h3>
              <Controller
                name="agreePolicy"
                control={control}
                defaultValue={false}
                rules={{ required: 'You must agree to the policy' }}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="I understand the cancellation policy"
                  />
                )}
              />
              {errors.agreePolicy && <p style={{ color: 'red' }}>{errors.agreePolicy.message}</p>}
              <p>Cancellations outside 30 days incur no penalty. Cancellations inside of 30 days you forfeit all money paid unless you can find someone to take your place. We highly recommend taking out travel insurance for any reason that could cause a last minute cancellation.</p>

              <h3 className='purpleLabel'>Terms*</h3>
              <Controller
                name="agreeTerms"
                control={control}
                defaultValue={false}
                rules={{ required: 'You must agree to the terms' }}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="I understand and agree to the terms"
                  />
                )}
              />
              {errors.agreeTerms && <p style={{ color: 'red' }}>{errors.agreeTerms.message}</p>}
              <Box sx={{ backgroundColor: 'white', borderRadius: '8px', padding: '1px 15px', margin: '3 3px' }}>
                <p>This facility does not have any indoor or covered courts. We follow the USTA guidelines for playing in cold or hot temperatures. Every player is responsible for their decision regarding medical circumstances they may have limiting their ability to play in outside conditions.
                  The camp will not be canceled due to rain. If rain does impact our scheduled clinic and match hours, we will do our best to reschedule those hours throughout the week. If rain is persistent, and we are forced to miss on court time, we will add off court activities such as chalk talks, video analysis, and happy hours. We will only be hosting padel clinics and matches on site at the resort location. We will not be traveling to other facilities in the area. Please note that we will refund missed on court hours.</p>
              </Box>

              <Grid container display={{ xs: 'block', md: 'flex' }} alignItems="center" textAlign={{ xs: 'center', md: 'left' }} justifyContent="center" marginTop={'10px'} spacing={6}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  type="button"
                  href="/MyGetaways"
                  variant="outlined"
                  sx={{
                    minWidth: '15vw',
                    maxWidth: '13vw',
                    m: 2,
                    margin: '5 15px',
                    padding: '5px 15px',
                    borderRadius: '8px', bgcolor: '#FFF', color: '#3C1C91', fontWeight: 'medium', textTransform: 'none',
                    ':hover': { bgcolor: '#3C1C91', color: 'white' }
                  }}
                  disableElevation
                >
                  Retry
                </Button>
                <Button
                  startIcon={<ShoppingCartIcon />}
                  type="submit"
                  variant="outlined"
                  sx={{
                    borderRadius: '8px',
                    minWidth: '18vw',
                    maxWidth: '20vw',
                    m: 2,
                    padding: '5px 12px',
                    bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'medium', textTransform: 'none',
                    ':hover': { bgcolor: 'white', color: '#3C1C91' }
                  }}
                  disableElevation
                >
                  Book getaway
                </Button>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}