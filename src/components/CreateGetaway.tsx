import { useForm, Controller, useFieldArray, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, TextField, Button, Divider, Typography, Card} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid2';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import AdminSidebar from './AdminSidebar';
// import AdminSideBar from './AdminSideBar';
import AcademySchedule from '../components/AcademySchedule';
import TournamentsSchedule from '../components/TournamentsSchedule';
import LaddersSchedule from '../components/LaddersSchedule';

const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9\s]*$/;
// const YOUTUBE_VIMEO_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)([a-zA-Z0-9_-]{11,})/;

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
  galleryVideo?: string;
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
    <Grid container rowSpacing={1} columnSpacing={{ xs:1, sm:2}} >
    <Grid size={{ xs:2 }}><AdminSidebar/></Grid>
    <Grid size={{ xs:10 }} className='section blueBg'>
      <h2 className='title'>Create getaway</h2>
      <Box sx={{ width: 1000, maxWidth: '100%', padding: '7px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Controller name="title" defaultValue=""
            control={control}
            rules={{
              required: "Getaway title is required",
              validate: (value?: string) =>
                !value || ALPHANUMERIC_REGEX.test(value)
                  ? true
                  : "Only letters and numbers are allowed.",
            }}
            render={({ field }) => (
              <TextField label="Getaway title" id="Getaway title" fullWidth margin="dense"
                {...field}
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : ''}
              />
            )}
          />
           
          <Controller name="overview"
            control={control}
            defaultValue=""
            rules={{
              // required: "Overview description is required",
              validate: (value?: string) =>
                !value || ALPHANUMERIC_REGEX.test(value)
                  ? true
                  : "Only letters and numbers are allowed.",
            }}
            render={({ field }) => (
              <TextField id={field.name} label="Overview description" fullWidth margin="dense" multiline maxRows={3}
                {...field}
                error={!!errors.overview}
                helperText={errors.overview?.message || ''}
              />
            )}
          />

          <Grid container spacing={2}>
            <Grid size={{ xs:4 }}>
              <Controller name="startDate" defaultValue=""
                control={control}
                // rules={{ required: "Start date is required" }}
                render={({ field }) => (
                  <TextField label="Start date" type="date" fullWidth margin="normal"
                    {...field}
                    slotProps={{ inputLabel: { shrink: true } }}
                    error={!!errors.startDate}
                    helperText={errors.startDate ? errors.startDate.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs:4 }}>
              <Controller name="endDate" defaultValue=""
                control={control}
                rules={{
                  // required: "End date is required",
                  validate: (value) => {
                    const start = control._formValues.startDate;
                    if (!value || !start) return true;
                    return new Date(start) < new Date(value) || "End date must be after start date";
                  }
                }}
                render={({ field }) => (
                  <TextField label="End date" fullWidth margin="normal"
                    {...field}
                    type="date"
                    slotProps={{ inputLabel: { shrink: true } }}
                    error={!!errors.endDate}
                    helperText={errors.endDate ? errors.endDate.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 4 }}>
            <Controller
              name="sport"
              control={control}
              defaultValue="1"
              rules={{
                validate: (value?: string) =>
                  !value || ALPHANUMERIC_REGEX.test(value)
                    ? true
                    : "Only letters and numbers are allowed.",
              }}
              render={({ field }) => (
                <TextField
                  id={field.name}
                  // name={field.name}
                  label="Sport"
                  select
                  fullWidth
                  margin="normal"
                  {...field}
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

            
          <Controller name="caption" defaultValue=""
            control={control}
            rules={{
              validate: (value?: string) =>
                !value || ALPHANUMERIC_REGEX.test(value)
                  ? true
                  : "Only letters and numbers are allowed.",
            }}
            render={({ field }) => (
              <TextField label="Photo Caption (Optional)" fullWidth margin="dense"
                {...field}
                error={!!errors.caption}
                helperText={
                  errors.caption
                    ? errors.caption.message
                    : "Only letters and numbers allowed."
                }
              />
            )}
          />

         
          {/* <Controller name="galleryVideo" defaultValue=""
            control={control}
            rules={{
              // required: "Video link is required",
              validate: (value: string) =>
                value === "" ||
                YOUTUBE_VIMEO_REGEX.test(value) ||
                "Please enter a valid YouTube or Vimeo link",
            }}
            render={({ field }) => (
              <TextField label="Youtube or Vimeo link (Optional)" fullWidth margin="dense"
                {...field}
                error={!!errors.galleryVideo}
                helperText={
                  errors.galleryVideo
                    ? errors.galleryVideo.message
                    : "Recommended resolution 1280x720px"
                }
              />
            )}
          /> */}

          <Card
            sx={{
              borderRadius: '0 24px',
              m: '20px 0', p: '20px 25px',
              bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'medium', textTransform: 'none',
              ':hover': { bgcolor: '#300e8eff' }
            }}>
            <h3 className='titleLeft'>Want your Getaways to stand out?</h3>
            <p>We offer professional photography and video services to enhance the beauty of your facilities and capture the essence of your club.
            Make your Getaways irresistible!</p>
            <Button startIcon={<LightbulbIcon />} href="https://racquetsappsuite.com/" target="_blank" disableElevation
              sx={{
                mb: 1, padding: '5px 15px', borderRadius: '8px', bgcolor: '#FFF', color: '#3C1C91', fontWeight: 'medium', textTransform: 'none',
                ':hover': { bgcolor: '#3C1C91', color: 'white'}
              }}
            > Learn more </Button>
          </Card>

           
          <Typography variant="h6" color="#3C1C91" sx={{ m: '1 0', fontWeight:"bold"  }}> Getaway details </Typography>
          <Divider aria-hidden="true"/>

          <Controller name="mainDescription" defaultValue=""
            control={control}
            rules={{
              // required: "Main description is required"
              validate: (value?: string) =>
                !value || ALPHANUMERIC_REGEX.test(value)
                  ? true
                  : "Only letters and numbers are allowed.",
            }}
            render={({ field }) => (
              <TextField label="Main description" fullWidth multiline maxRows={7} margin="normal"
                {...field}
                error={!!errors.mainDescription}
                helperText={errors.mainDescription ? errors.mainDescription.message : ''}
              />
            )}
          />

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

            <AcademySchedule/>
            <TournamentsSchedule/>
            <LaddersSchedule/>

            <Controller name="policies" defaultValue=""
              control={control}
              // rules={{ required: "Policies are required" }}
              render={({ field }) => (
                <TextField label="Policies" fullWidth margin="normal" multiline maxRows={3}
                  {...field}
                  error={!!errors.policies}
                  helperText={errors.policies ? errors.policies.message : ''}
                />
              )}
            />
            <Button type="submit" startIcon={<AddIcon />}       variant="contained" disableElevation
              sx={{
                mb: 2, bgcolor: '#00E392', color: '#1A2660', fontWeight: 'bold', borderRadius: '30px', textTransform: 'none',
                ':hover': { bgcolor: '#3C1C91', color: 'white' }
              }}
            > Add item </Button>

            <Controller name="terms" defaultValue=""
              control={control}
              // rules={{ required: "Terms are required" }}
              render={({ field }) => (
                <TextField label="Terms" multiline maxRows={7} fullWidth margin="normal"
                  {...field}
                  error={!!errors.terms}
                  helperText={errors.terms ? errors.terms.message : ''}
                />
              )}
            />
            <Button type="submit" startIcon={<AddIcon />} variant="contained" disableElevation
              sx={{
                mb: 2, bgcolor: '#00E392', color: '#1A2660', fontWeight: 'bold', borderRadius: '30px', textTransform: 'none',
                ':hover': { bgcolor: '#3C1C91', color: 'white' }
              }}
            > Add item </Button>

            <Box style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 5 }}>
              <Button type="button"
              // href="/MyGetaways"
              href="/getaways"
              startIcon={<ArrowBackIcon />} variant="outlined" disableElevation
                sx={{
                  width:'135px', borderRadius: '8px', bgcolor: '#FFF', color: '#3C1C91', fontWeight: 'medium', textTransform: 'none',
                  ':hover': { bgcolor: '#3C1C91', color: 'white' }
                }}
              > Retry </Button>

              <Button type="submit" startIcon={<SaveIcon />} variant="outlined"
                href="/getaways"
                sx={{
                  borderRadius: '8px', bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'medium', textTransform: 'none',
                  ':hover': { bgcolor: 'white', color: '#3C1C91' }
                }}
              > Save changes </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}