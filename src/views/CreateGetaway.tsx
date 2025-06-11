import { useForm, Controller, useFieldArray, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TextField, Button, Divider, Card} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid2';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import AdminSidebar from '../components/AdminSidebar';
import AcademySchedule from '../components/AcademySchedule';

import tournamentsLogo from '../assets/RappsIcons/tournamentsLogo.svg';
import TournamentsSchedule from '../components/TournamentsSchedule';

import laddersLogo from '../assets/RappsIcons/laddersLogo.svg';
import LaddersSchedule from '../components/LaddersSchedule';

import { styled } from '@mui/material/styles';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface FormData {
  title: string;
  overview: string;
  mainDescription: string;
  startDate: string;
  endDate: string;
  sport: string;
  price: number;
  address: string;
  galleryPhoto: string;
  caption?: string;
  amenities: { name: string }[];
  policies: string;
  terms: string;
  lodgingOptions: { name: string }[];
  optionalAddOns: { name: string; price: number }[];
}

const schema = yup.object().shape({
  title: yup.string().required('Getaway title is required'),
  overview: yup.string().required('Overview description is required'),
  mainDescription: yup.string().required('Main description is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
  sport: yup.string().required('Sport selection is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .min(0, 'Price must be positive'),
  address: yup.string().required('Address is required'),
  galleryPhoto: yup.string().required('Gallery photo is required'),
  caption: yup.string().notRequired(),
  amenities: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('Amenity is required')
      })
    )
    .min(1, 'At least one amenity is required'),
  policies: yup.string().required('Policies are required'),
  terms: yup.string().required('Terms are required'),
  lodgingOptions: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('Lodging option is required')
      })
    )
    .min(1, 'At least one lodging option is required'),
  optionalAddOns: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('Add-on name is required'),
        price: yup
          .number()
          .typeError('Add-on price must be a number')
          .required('Add-on price is required')
          .min(0, 'Add-on price must be positive')
      })
    )
});

const sports = [
  { value: '1', label: 'Tennis' },
  { value: '2', label: 'Padel' },
  { value: '3', label: 'Pickelball' }
];

export default function CreateGetaway() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      amenities: [{ name: '' }],
      lodgingOptions: [{ name: '' }],
      optionalAddOns: [{ name: '', price: 0 }]
    },
    resolver: yupResolver(schema)
  });

  const { fields: amenityFields, append: appendAmenity, remove: removeAmenity } = useFieldArray({
    control,
    name: 'amenities'
  });

  const { fields: lodgingFields, append: appendLodging, remove: removeLodging } = useFieldArray({
    control,
    name: 'lodgingOptions'
  });

  const { fields: addOnFields, append: appendAddOn, remove: removeAddOn } = useFieldArray({
    control,
    name: 'optionalAddOns'
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs:1, sm:2}} sx={{ mt:8 }}>
      <Grid size={{ xs:2 }}><AdminSidebar/></Grid>
      <Grid size={{ xs:10 }} className='section blueBg' >
        <h2 className='title'>Create getaway</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Getaway title"
                  fullWidth
                  margin="dense"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
            <Controller
              name="overview"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Overview description"
                  fullWidth
                  margin="dense"
                  multiline
                  maxRows={3}
                  error={!!errors.overview}
                  helperText={errors.overview?.message}
                />
              )}
            />
            <Controller
              name="mainDescription"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Main description"
                  fullWidth
                  multiline
                  maxRows={7}
                  margin="normal"
                  error={!!errors.mainDescription}
                  helperText={errors.mainDescription?.message}
                />
              )}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 4 }}>
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Start date"
                      type="date"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.startDate}
                      helperText={errors.startDate?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="End date"
                      type="date"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.endDate}
                      helperText={errors.endDate?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Controller
                  name="sport"
                  control={control}
                  defaultValue="1"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Sport"
                      fullWidth
                      margin="normal"
                      error={!!errors.sport}
                      helperText={errors.sport ? errors.sport.message : 'Please select the sport'}
                    >
                      {sports.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>
            <Controller
              name="price"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  margin="normal"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />

            <Controller
              name="galleryPhoto"
              control={control}
              defaultValue=""
              rules={{ required: "Gallery photo is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Gallery Photo"
                  fullWidth
                  margin="normal"
                  error={!!errors.galleryPhoto}
                  // helperText={errors.galleryPhoto ? errors.galleryPhoto.message : ''}
                  helperText="Maximum size 5 MB, recommended resolution: 1280x720px"
                />
              )}
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{
                mb: 2, bgcolor: '#00E392', color: '#1A2660', fontWeight: 'bold', borderRadius: '30px', textTransform: 'none',
                ':hover': { bgcolor: '#3C1C91', color: 'white' }
              }}
              disableElevation
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>

            <Controller
              name="caption"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Photo Caption (Optional)" fullWidth margin="normal" />
              )}
            />
            <Card
              sx={{
                borderRadius: '8px',
                mt: 2, mb: 0,  padding: '15px 15px', margin: '3 5px',
                bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'medium', textTransform: 'none',
                // ':hover': { bgcolor: 'white', color: '#3C1C91' }
              }}>
              <h3 className='titleLeft'>Want your Getaways to stand out?</h3>
              <p>We offer professional photography and video services to enhance the beauty of your facilities and capture the essence of your club.
              Make your Getaways irresistible!
              </p>
              <Button
                startIcon={<LightbulbIcon />}
                type="submit"
                href="https://racquetsappsuite.com/" target="_blank"
                sx={{
                  mb: 1,
                  borderRadius: '8px',
                  padding: '5px 15px',
                  bgcolor: '#FFF', color: '#3C1C91', fontWeight: 'medium', textTransform: 'none',
                  ':hover': { bgcolor: '#3C1C91', color: 'white' }
                }}
                disableElevation
              >
                Learn more
              </Button>
            </Card>

            <Divider sx={{ my: 1 }} />
            <h5>Services & amenities</h5>
            {amenityFields.map((field, index) => (
              <div key={field.id} style={{ display: 'flex', alignItems: 'center' }}>
                <Controller
                  name={`amenities.${index}.name`}
                  control={control}
                  defaultValue={field.name}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Amenity ${index + 1}`}
                      fullWidth
                      margin="normal"
                      error={!!errors.amenities?.[index]?.name}
                      helperText={errors.amenities?.[index]?.name?.message}
                    />
                  )}
                />
                <Button
                  variant="outlined" disableElevation size="medium"
                  startIcon={<DeleteIcon />}
                  sx={{
                    p:'5px 24px', ml: 2,
                    borderRadius: "10px", textTransform: "none",
                    bgcolor: '#3C1C91', color: '#fff', fontWeight: 'bold',
                    ':hover': { color: '#3C1C91', bgcolor: '#fff'  }
                  }}
                  onClick={() => removeAmenity(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            {typeof errors.amenities === 'string' && (
              <div style={{ color: 'red', marginBottom: '8px' }}>{errors.amenities}</div>
            )}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                mb: 1, bgcolor: '#00E392', color: '#1A2660', fontWeight: 'bold', borderRadius: '30px', textTransform: 'none',
                ':hover': { bgcolor: '#3C1C91', color: 'white' }
              }}
              onClick={() => appendAmenity({ name: '' })}
            > Add item </Button>
            <AcademySchedule/>
            
            <Divider textAlign="center" aria-hidden="true">
                <img src={tournamentsLogo} style={{height:'36px'}} className="logo" alt="Racquets Tournaments Logo" />
              </Divider>
              <p>You can add this available Tournaments&trade; sessions in the Getaway&trade;</p>
            <TournamentsSchedule/><br/>

            <Divider textAlign="center" aria-hidden="true">
              <img src={laddersLogo} style={{height:'36px'}} className="logo" alt="Racquets Ladders Logo" />
            </Divider>
            <p>  You can add this available Ladders&trade; sessions in this Getaway&trade;</p>
            <LaddersSchedule/>

            <Controller
              name="policies"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Policies"
                  fullWidth
                  margin="normal"
                  multiline
                  maxRows={3}
                  error={!!errors.policies}
                  helperText={errors.policies?.message}
                />
              )}
            />
            <Controller
              name="terms"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Terms"
                  fullWidth
                  margin="normal"
                  multiline
                  maxRows={7}
                  error={!!errors.terms}
                  helperText={errors.terms?.message}
                />
              )}
            />
            <Divider sx={{ my: 2 }} />
            <h5>Lodging options</h5>
            {lodgingFields.map((field, index) => (
              <div key={field.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
                <Controller
                  name={`lodgingOptions.${index}.name`}
                  control={control}
                  defaultValue={field.name}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Lodging Option ${index + 1}`}
                      fullWidth
                      margin="normal"
                      error={!!errors.lodgingOptions?.[index]?.name}
                      helperText={errors.lodgingOptions?.[index]?.name?.message}
                    />
                  )}
                />
                <Button
                  variant="outlined" disableElevation size="medium"
                  startIcon={<DeleteIcon />}
                  sx={{
                    p:'5px 26px', ml: 2,
                    borderRadius: "10px", textTransform: "none",
                    bgcolor: '#3C1C91', color: '#fff', fontWeight: 'bold',
                    ':hover': { color: '#3C1C91', bgcolor: '#fff'  }
                  }}
                  onClick={() => removeLodging(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            {typeof errors.lodgingOptions === 'string' && (
              <div style={{ color: 'red', marginBottom: '8px' }}>{errors.lodgingOptions}</div>
            )}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                mb: 1, bgcolor: '#00E392', color: '#1A2660', fontWeight: 'bold', borderRadius: '30px', textTransform: 'none',
                ':hover': { bgcolor: '#3C1C91', color: 'white' }
              }}
              disableElevation
              onClick={() => appendLodging({ name: '' })}
            >
              Add item
            </Button>
            <Divider sx={{ my: 2 }} />
            <h5>Optional Add Ons [name, price]</h5>
            {addOnFields.map((field, index) => (
              <div key={field.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Controller
                      name={`optionalAddOns.${index}.name`}
                      control={control}
                      defaultValue={field.name}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={`Optional Add On ${index + 1}`}
                          fullWidth
                          margin="normal"
                          error={!!errors.optionalAddOns?.[index]?.name}
                          helperText={errors.optionalAddOns?.[index]?.name?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Controller
                      name={`optionalAddOns.${index}.price`}
                      control={control}
                      defaultValue={field.price}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={`Optional Add On ${index + 1} Price`}
                          type="number"
                          fullWidth
                          margin="normal"
                          error={!!errors.optionalAddOns?.[index]?.price}
                          helperText={errors.optionalAddOns?.[index]?.price?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="outlined" disableElevation size="medium"
                  startIcon={<DeleteIcon />}
                  sx={{
                    p:'5px 26px', ml: 2,
                    borderRadius: "10px", textTransform: "none",
                    bgcolor: '#3C1C91', color: '#fff', fontWeight: 'bold',
                    ':hover': { color: '#3C1C91', bgcolor: '#fff'  }
                  }}
                  onClick={() => removeAddOn(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                mb: 1, bgcolor: '#00E392', color: '#1A2660', fontWeight: 'bold', borderRadius: '30px', textTransform: 'none',
                ':hover': { bgcolor: '#3C1C91', color: 'white' }
              }}
              onClick={() => appendAddOn({ name: '', price: 0 })}
            >
              Add item
            </Button>

            <Grid container display={{ xs: 'block', md: 'flex' }} alignItems="center" textAlign={{ xs: 'center', md: 'left' }} justifyContent="center" marginTop={'10px'} spacing={6}>
              <Button
                startIcon={<ArrowBackIcon />}
                type="button"
                href="/getaways"
                variant="outlined"
                sx={{
                  mt: 2, mb: 5, borderRadius: '8px', padding: '5px 15px', margin: '5 15px',
                  bgcolor: '#FFF', color: '#3C1C91', fontWeight: 'medium', textTransform: 'none',
                  ':hover': { bgcolor: '#3C1C91', color: 'white' }
                }}
                disableElevation
              >
                Retry
              </Button>
              <Button
                startIcon={<SaveIcon />}
                type="submit" variant="outlined"
                // href="/getaways"
                sx={{
                  mt: 2, mb: 5, borderRadius: '8px', padding: '5px 15px', margin: '5 5px',
                  bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'medium', textTransform: 'none',
                  ':hover': { bgcolor: 'white', color: '#3C1C91' }
                }}
                disableElevation
              >
                Save changes
              </Button>
            </Grid>
          </form>
      </Grid>
    </Grid>
  );
}