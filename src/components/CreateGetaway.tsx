import * as React from 'react';
import { useForm, Controller, useFieldArray, SubmitHandler } from 'react-hook-form';

import { Box, TextField, Button, Divider, Typography, Card} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid2';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import AdminSidebar from './AdminSidebar';
import { GalleryPhotoInput } from "../components/GalleryPhotoInput";
import AcademySchedule from '../components/AcademySchedule';
import TournamentsSchedule from '../components/TournamentsSchedule';
import LaddersSchedule from '../components/LaddersSchedule';
import { AddressAutocompleteField } from '../components/AddressAutocompleteField';

import { ScheduleForm } from '../components/ScheduleForm';
import { GetawayFormData, ScheduleRow } from '../types/getaway';
import { mapScheduleRowsToApiFormat } from '../utils/dataMappers';
import { handleGetawaySubmit } from '../services/getawayApi';
import { useAppConfig } from "../contexts/AppConfigContext";


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

const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9\s]*$/;
const YOUTUBE_VIMEO_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)([a-zA-Z0-9_-]{11,})/;
const sports = [
  { value: '1', label: 'Tennis' },
  { value: '2', label: 'Padel' },
  { value: '3', label: 'Pickelball' }
];

export default function CreateGetaway() {
  const { googleMapsApiKey } = useAppConfig();
  const { handleSubmit, control, formState: { errors } } = useForm<GetawayFormData>({
    defaultValues: {
      title: "",
      overview: "",
      // getawayAddress: { address: "", lat: null, lng: null },
      galleryPhotos: null,
      lodgingOptions: [{ name: "", price: 0 }],
      optionalAddOns: [{ name: "", price: 0 }],
      amenities: [{ name: "" }],
      schedule: [],
    }
  });

  // const navigate = useNavigate();

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

  const [scheduleRows, setScheduleRows] = React.useState<ScheduleRow[]>([]);
  const [scheduleError, setScheduleError] = React.useState<string | null>(null);

  // const onSubmit: SubmitHandler<FormData> = (data) => {
  const onSubmit: SubmitHandler<GetawayFormData> = async (data) => {
    if (scheduleRows.length === 0) {
      setScheduleError("You must add at least one schedule row.");
      document.getElementById("schedule-section")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setScheduleError(null);
    const apiSchedule = mapScheduleRowsToApiFormat(scheduleRows);
    const payload: GetawayFormData = {
      ...data,
      // title: data.title,
      // overview: data.overview,
      // startDate: data.startDate,
      // endDate: data.endDate,
      // sport: data.sport,
      // mainDescription: data.mainDescription,
      // policies: data.policies,
      // terms: data.terms,
      // lodgingOptions: data.lodgingOptions,
      // optionalAddOns: data.optionalAddOns,
      // amenities: data.amenities,
      // caption: data.caption,
      // galleryVideo: data.galleryVideo,
      // getawayAddress: data.getawayAddress,
      schedule: apiSchedule,

      // `galleryPhotos` array validation
      // galleryPhotos: Array.isArray(data.galleryPhotos)
      //   ? data.galleryPhotos as File[]
      //   : data.galleryPhotos ? [data.galleryPhotos as File] : null,
    };
    const success = await handleGetawaySubmit(payload);

    if (success) {
      // navigate('/getaways');
    } else {
      console.error("Failed to submit getaway");
    }
    console.log(data);
  };
  React.useEffect(() => {
    if (scheduleRows.length > 0 && scheduleError) {
      setScheduleError(null);
    }
  }, [scheduleRows, scheduleError]);

  return (
    <Grid container columnSpacing={{ xs:1, sm:2}} >
      <Grid size={{ xs:1.8 }}><AdminSidebar/></Grid>
      <Grid size={{ xs:10.2 }} className='section blueBg'>
        <h2 className='title'>Create getaway</h2>
        <Box sx={{ width: 1000, maxWidth: '100%', padding: '7px 0px' }}>
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

            <AddressAutocompleteField
              control={control}
              name="getawayAddress"
              apiKey={googleMapsApiKey}
            />

            <GalleryPhotoInput
              name="galleryPhotos"
              control={control}
              multiple={true}
              rules={{ required: "Photo is required" }}
            />

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

            <Controller name="galleryVideo" defaultValue=""
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
            />

            <Card
              sx={{
                borderRadius: '0 24px', m: '20px 0', p: '20px 25px',
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

            <Typography variant="h6" color="#3C1C91" sx={{ m: '1 0', fontSize: '14px', fontWeight:"bold"  }}> Lodging options(Single or double occupancy)</Typography>
            <Divider aria-hidden="true"/>
            {lodgingFields.map((field, index) => (
              <div key={field.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }} >
                <Controller name={`lodgingOptions.${index}.name`}
                  control={control}
                  defaultValue={field.name}
                  rules={{
                    // required: "Lodging option is required",
                    validate: (value?: string) =>
                      !value || ALPHANUMERIC_REGEX.test(value)
                        ? true
                        : "Only letters and numbers are allowed.",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Lodging Option ${index + 1}`}
                      fullWidth margin="normal"
                      sx={{ maxWidth:'570px', mr:'15px'}}
                      error={!!errors.lodgingOptions?.[index]?.name}
                      helperText={errors.lodgingOptions?.[index]?.name ? errors.lodgingOptions?.[index]?.name.message : ''}
                    />
                  )}
                />

                <Controller
                  name={`lodgingOptions.${index}.price`}
                  control={control}
                  // defaultValue={field.price}
                  defaultValue={Number(field.price) || 0}
                  rules={{
                    // required: "Lodging price is required",
                    validate: {
                      isNumber: (value) => {
                        const numberValue = parseFloat(String(value));
                        return !isNaN(numberValue) || 'Price must be a number';
                      },
                      isPositive: (value) => {
                        const numberValue = parseFloat(String(value));
                        return numberValue >= 0 || 'The price must be a positive number';
                      }
                    }
                  }}
                  render={({ field }) => (
                    <TextField sx={{ width: '220px', mr:'15px'}}
                      {...field}
                      label={`Lodging ${index + 1} Price`}
                      type="number" margin="normal"
                      error={!!errors.lodgingOptions?.[index]?.price}
                      helperText={errors.lodgingOptions?.[index]?.price ? errors.lodgingOptions?.[index]?.price.message : ''}
                    />
                  )}
                />

                <Button startIcon={<DeleteIcon />} variant="outlined" disableElevation size="medium" aria-label="delete"
                  sx={{
                    p:'5px 16px', m:'0 2px',  borderRadius: "10px", textTransform: "none", bgcolor: '#3C1C91', color: '#fff', fontWeight: 'bold',
                    ':hover': { color: '#3C1C91', bgcolor: '#fff'  }
                  }}
                  onClick={() => removeLodging(index)}
                  // disabled={activeForms.length === 1}
                >Remove</Button>
              </div>
            ))}
            <Button
              startIcon={<AddIcon />} variant="contained"
              onClick={() => appendLodging({ name: "", price: 0})}
              sx={{
                mt: 0, mb: 3, bgcolor: '#00E392', color: '#1A2660', fontWeight: 'bold', borderRadius: '30px', textTransform: 'none',
                ':hover': { bgcolor: '#3C1C91', color: 'white' }
              }}
              disableElevation
            > Add item </Button>

            <Typography variant="h6" color="#3C1C91" sx={{ m: '1 0', fontSize: '14px', fontWeight:"bold"  }}> Optional Add Ons [name, price] </Typography>
            <Divider aria-hidden="true" />

            {addOnFields.map((field, index) => (
              <div key={field.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <Controller
                  name={`optionalAddOns.${index}.name`}
                  control={control}
                  defaultValue={field.name}
                  rules={{
                    // required: "Add-on name is required",
                    validate: (value?: string) =>
                      !value || ALPHANUMERIC_REGEX.test(value)
                        ? true
                        : "Only letters and numbers are allowed.",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Optional Add On ${index + 1}`}
                      sx={{ maxWidth:'550px', mr:'15px'}} fullWidth margin="normal"
                      error={!!errors.optionalAddOns?.[index]?.name}
                      helperText={errors.optionalAddOns?.[index]?.name ? errors.optionalAddOns?.[index]?.name.message : ''}
                    />
                  )}
                />
                <Controller
                  name={`optionalAddOns.${index}.price`}
                  control={control}
                  // defaultValue={field.price}
                  defaultValue={Number(field.price) || 0}
                  rules={{
                    // required: "Add-on price is required"
                    validate: {
                      isNumber: (value) => {
                        const numberValue = parseFloat(String(value));
                        return !isNaN(numberValue) || 'Price must be a number';
                      },
                      isPositive: (value) => {
                        const numberValue = parseFloat(String(value));
                        return numberValue >= 0 || 'The price must be a positive number';
                      }
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Add On ${index + 1} Price`}
                      type="number" margin="normal" sx={{ maxWidth:'220px', mr:'15px'}}
                      error={!!errors.optionalAddOns?.[index]?.price}
                      helperText={errors.optionalAddOns?.[index]?.price ? errors.optionalAddOns?.[index]?.price.message : ''}
                    />
                  )}
                />
                <Button startIcon={<DeleteIcon />} variant="outlined" disableElevation size="medium" aria-label="delete"
                  sx={{
                    p:'5px 16px', m:'0 2px', borderRadius: "10px",
                    textTransform: "none", bgcolor: '#3C1C91', color: '#fff', fontWeight: 'bold',
                    ':hover': { color: '#3C1C91', bgcolor: '#fff'  }
                  }}
                  onClick={() => removeAddOn(index)}
                  // disabled={activeForms.length === 1}
                > Remove </Button>
              </div>
            ))}

            <Button startIcon={<AddIcon />} variant="contained" disableElevation
              onClick={() => appendAddOn({ name: "", price: 0 })}
              sx={{
                mt: 0, mb: 2, bgcolor: '#00E392', color: '#1A2660', fontWeight: 'bold', borderRadius: '30px', textTransform: 'none',
                ':hover': { bgcolor: '#3C1C91', color: 'white' }
              }}
            > Add item </Button>

            <Typography variant="h6" color="#3C1C91" sx={{ m: '1 0', fontSize: '14px', fontWeight:"bold"  }}> Services & amenities included </Typography>
            <Divider aria-hidden="true" sx={{ pt:0, mt: 0 }} />
            {amenityFields.map((field, index) => (
              <div key={field.id}
                style={{ display: 'flex', alignItems: 'center', marginBottom: "0px", justifyContent: ' start' }}
              >
                <Controller
                  name={`amenities.${index}.name`}
                  control={control}
                  defaultValue={field.name}
                  // rules={{ required: "Amenity is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth margin="normal"
                      sx={{ maxWidth:'550px', mr:'9px' }}
                      label={`Amenity ${index + 1}`}
                      error={!!errors.amenities?.[index]?.name}
                      helperText={errors.amenities?.[index]?.name ? errors.amenities?.[index]?.name.message : ''}
                    />
                  )}
                />
                <Button startIcon={<DeleteIcon />} variant="outlined" disableElevation size="medium"
                  sx={{
                    p:'5px 16px', m:'0 3px', borderRadius: "10px", textTransform: "none",
                    bgcolor: '#3C1C91', color: '#fff', fontWeight: 'bold',
                    ':hover': { color: '#3C1C91', bgcolor: '#fff'  }
                  }}
                  onClick={() => removeAmenity(index)} aria-label="delete"
                  // disabled={activeForms.length === 1}
                > Remove </Button>
              </div>
            ))}
            <Button startIcon={<AddIcon />} variant="contained" aria-label="Add amenity" disableElevation
              onClick={() => appendAmenity({ name: "" })}
              sx={{
                mb: 3, bgcolor: '#00E392', color: '#1A2660', borderRadius: '30px', fontWeight: 'bold', textTransform: 'none',
                ':hover': { bgcolor: '#3C1C91', color: 'white' }
              }}
            > Add item </Button>

            {scheduleError && (
              <div style={{ color: "red", fontWeight: "bold", marginBottom: 8 }}>
                {scheduleError}
              </div>
            )}
            <ScheduleForm
            rows={scheduleRows} setRows={setScheduleRows}
            />

            <AcademySchedule/>
            <TournamentsSchedule/>
            <LaddersSchedule/>

            <Controller name="policies" defaultValue=""
              control={control}
              // rules={{ required: "Policies are required" }}
              render={({ field }) => (
                <TextField label="Policies" fullWidth margin="normal" multiline maxRows={3}
                  {...field} id={field.name}
                  error={!!errors.policies}
                  helperText={errors.policies ? errors.policies.message : ''}
                />
              )}
            />
            <Button type="submit" startIcon={<AddIcon />} variant="contained" disableElevation
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
                  {...field} id={field.name}
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
              <Button type="button" href="/getaways"
              startIcon={<ArrowBackIcon />} variant="outlined" disableElevation
                sx={{
                  width:'135px', borderRadius: '8px', bgcolor: '#FFF', color: '#3C1C91', fontWeight: 'medium', textTransform: 'none',
                  ':hover': { bgcolor: '#3C1C91', color: 'white' }
                }}
              > Retry </Button>

              <Button type="submit" startIcon={<SaveIcon />} variant="outlined"
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