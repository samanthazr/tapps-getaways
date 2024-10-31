import React, { useState } from 'react';
import {
  Container,
  Divider,
  Stack,
  Modal,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import view1 from '../assets/backgrounds/clubView1.png';
import view2 from '../assets/backgrounds/hotel.jpg';
import view4 from '../assets/backgrounds/padel.jpg';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const images = [view4, view1, view2,
  // view3,
  "video"];

function GetawayDetail() {
  const [mainImage, setMainImage] = useState<string | "video">(view4);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const change = (newSrc: string | "video") => {
    setMainImage(newSrc);
  };

  const revert = () => {
    setMainImage(view4);
  };

  const openFullScreen = (index: number) => {
    setCurrentIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  //Getaways options
  const [value, setValue] = React.useState('female');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <>
      <Container
        sx={{
          display:"flex",
          flexDirection: 'column', mt:10
        }}
      >
        <Stack>
          <Button
            startIcon={<ArrowBackIcon />}
            size="small"
            variant="text"
            href="/my_getaways"
            sx={{
              mt: 2, mb: 2,
              borderRadius:'8px',
              width: '200px',
              color:'#000', textTransform: 'none',
            }}
          >
            Search more getaways!
          </Button>
        </Stack>
        <Stack gap={1}
          sx={{
            display:"flex",
            flexDirection: 'row',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
          }}
        >
          <Stack>
            {mainImage === "video" ? (
              <iframe width="1280" height="519" src="https://www.youtube.com/embed/dv_hzU3gw34" title="PIVOT TENNIS | Exclusive Las Vegas Getaway" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen style={{ maxWidth: '39vw', marginBottom: '5px', objectFit: 'contain' }} />
            ) : (
              <img src={mainImage} id="mainImage" onClick={() => openFullScreen(images.indexOf(mainImage))}
                alt="getaway photo 1" style={{
                  maxHeight: '30vw',
                  maxWidth: '39vw',
                  marginBottom: '5px',
                  objectFit: 'contain'
              }} />
            )}
            <Stack
              sx={{
                display: "flex",
                flexDirection: 'row',
                width: '39vw',
                maxHeight: '30vw',
                maxWidth: '39vw',
                flexWrap: 'wrap',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'space-between',
              }}
            >
              {images.slice(1).map((image, index) => (
                image === "video" ? (
                  <Box key={index} sx={{
                    width: '160px',
                    height: '100px',
                    backgroundColor: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    cursor: 'pointer'
                  }} onMouseOver={() => change("video")} onMouseOut={revert} onClick={() => openFullScreen(index + 1)}>
                    Video
                  </Box>
                ) : (
                  <img key={index} src={image} className="thumbnail"
                    alt={`getaway photo ${index + 2}`} style={{
                      width: '160px',
                      height: '100px',
                  }} onMouseOver={() => change(image)} onMouseOut={revert} onClick={() => openFullScreen(index + 1)} />
                )
              ))}
            </Stack>
          </Stack>

          <Stack sx={{ fontSize: 15, ml: 2 }}>
            <h3 className='title4'>Padel Weekend Getaway!</h3>
            <h5 className='title4'>The Ritz-Carlton Key Biscayne Miami, Florida</h5>
            <p>
              Join the Cliff Drysdale team for an exclusive padel experience at The Ritz-Carlton Key Biscayne, Miami. This unique camp combines luxury accommodations for 2 nights, expert instructions, and competitive play for intermediate players from 3.0-3.5 level
            </p>

            <div className='inline'>
              <h4 className='title4'>Dates:</h4>
              <span> October 11-13, 2024</span>
            </div>

            <FormControl>
              <h4 className='title4'>Rates Start at:</h4>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="$1200" control={<Radio />} label="$1200+tax/person Double Occupancy for a Resort View Room" />
                <FormControlLabel value="$519" control={<Radio />} label="$519+tax/person Double Occupancy for Partial Ocean View Room" />
              </RadioGroup>
            </FormControl>

            <Button
              startIcon={<ShoppingCartIcon />}
              type="submit"
              href="/bookgetaway"
              variant="contained"
              sx={{
                mt: 1, mb: 3, borderRadius:'8px',
                width: '15vw',
                bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'bold', textTransform: 'none',
                ':hover': {
                  bgcolor: 'white',
                  color: '#3C1C91',
                }
              }}
            >
              Book now
            </Button>
          </Stack>
        </Stack>

        <Modal
          open={isFullScreen} onClose={closeFullScreen}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor:'#371984' }}
        >
          <Box sx={{ position: 'relative', width: '90%', height: '90%', color: '#fff' }}>
            <IconButton
              sx={{ position: 'absolute', top: 10, right: 10, color: 'white' }}
              onClick={closeFullScreen}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              sx={{ position: 'absolute', top: '50%', left: 10, color: 'white', transform: 'translateY(-50%)' }}
              onClick={handlePrev}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              sx={{ position: 'absolute', top: '50%', right: 10, color: 'white', transform: 'translateY(-50%)' }}
              onClick={handleNext}
            >
              <ArrowForwardIosIcon />
            </IconButton>

            <h3 className='titleLeft'>Padel Weekend Getaway!</h3>
            <h5 className='titleLeft'>The Ritz-Carlton Key Biscayne Miami, Florida</h5>
            <center>
              {images[currentIndex] === "video" ? (
                <iframe width="1280" height="519" src="https://www.youtube.com/embed/dv_hzU3gw34" title="PIVOT TENNIS | Exclusive Las Vegas Getaway" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen style={{ width: '55vw', maxHeight: '35vw', objectFit: 'contain' }} />
              ) : (
                <img src={images[currentIndex]} alt="Full screen" style={{ width: '55vw', maxHeight: '35vw', objectFit: 'contain' }} />
              )}
            </center>
            <Stack gap={1}
              sx={{
                display:"flex",
                flexDirection: 'row',
                alignItems: 'flex-start',
                alignContent: 'flex-start',
                flexWrap : 'wrap',
                justifyContent: 'space-around',
                color: '#fff'
              }}
            >
              <Stack sx={{ fontSize: 15, width: '60vw' }}>
                <p>
                  This unique camp will bring you the ultimate tennis experience where you can relax and unwind while playing tennis like never before. The weekend includes 8 hours of tennis instruction and play
                </p>
              </Stack>
              <Button
                startIcon={<ShoppingCartIcon />}
                type="submit"
                href="/MyGetaways"
                variant="contained"
                sx={{
                  mt: 1, mb: 3, borderRadius:'8px',
                  minWidth: '12vw',
                  maxWidth: '13vw',
                  bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'bold', textTransform: 'none',
                  ':hover': { bgcolor: 'white', color: '#3C1C91'},
                  borderColor: 'primary.main', border: 1
                }}
              >
                Book now
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Container>
      <Container
        sx={{
          display:"flex",
          flexDirection: 'column',
          mt: 3,
        }}
      >
        <Stack>
          <h4 className='title4'>Description</h4>
            <Divider aria-hidden="true" sx={{bgcolor:'#3C1C91'}} />
            <p>
              This unique camp is the first of its kind with luxurv accommodations, group clinics, and competition <br/>
            {/* </p>
            <p> */}
              The weekend includes 2 nights or accommodations at the Ritz-Carlton, 8 nours or padel instruction and play, a courtside
              happy hour, <br/> and welcome gift.
              This nadel weekend getaway is designed for intermediate layers from 30-35
            {/* </p>
            <p> */}
            <br/>
            This padel weekend getaway is designed for intermediate lavers from 30-35 We will focus on specific drills to improve your match play.</p>
            <h4 className='title4'>Weekend Schedule</h4>
            <Divider aria-hidden="true" sx={{bgcolor:'#3C1C91'}} />
          <Stack
            sx={{
              flexWrap: 'wrap'
            }}
          >
            <table>
              <col />
              <col />
              <col />
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Activity</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Friday<br/>
                    2:00 PM
                  </td>
                  <td>Resort arrive</td>
                  <td>Resort</td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>-</td>
                  <td>Resort</td>

                </tr>
                <tr>
                  <td>Sunday</td>
                  <td></td>
                  <td>Resort</td>
                </tr>
              </tbody>
            </table>
          </Stack>
          <br/><br/><br/><br/>
          <Stack spacing={1}
            sx={{
              flexWrap: 'wrap',
              mt: 2,
              justifyContent: 'flex-start',
            }}
          >
            <h5 className='title4'>This getaway includes</h5>
            <ul>
              <li>Luxurious accommodations for 2 nights</li>
              <li>8 hours of padel instruction including drills and on-court match play and coaching
              Cliff Drysdale Gift</li>
              <li>Access to al recort amen</li>
              <li>Optional Spa Service.</li>

            </ul>
          </Stack>
          <Stack spacing={1}
            sx={{
              flexWrap: 'wrap',
              mt: 2, mb: 2,
              justifyContent: 'flex-start',
            }}
          >
            <h5 className='title4'>Payments & Policies</h5>
            <ul>
              <li>Cancellations outside 30 days will incur no penalty</li>
              <li>Cancellations inside 30 days will forfeit all monies paid unless vou can find someone to take your place</li>
              <li>Guests that do not play padel are welcome, call for pricing
              Additional nights available, pricing upon request</li>
            </ul>
          </Stack>
          <Stack direction="row" spacing={3}
            sx={{
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
              alignContent: 'center',
              mt: 2, mb: 2,
            }}
          >
            <h5 className='title5'>For more information:</h5>
            <Button
              startIcon={<CallIcon />}
              target="_blank"
              size="small"
              variant="contained"
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2uQZp2vPrJmwVmMkqMgVci1kx_lFIPox1JCBWoQfmLMymNhbW6k54PNtVBesApbXi7BdVBDewG"
              sx={{
                mt: 1, mb: 2, borderRadius:'8px',
                width: '12vw',
                bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'bold', textTransform: 'none',
                ':hover': {
                  bgcolor: 'white',
                  color: '#3C1C91',
                }
              }}
            >
              Schedule a call
            </Button>
            <Button
              startIcon={<WhatsAppIcon />}
              size="small" target="_blank"
              variant="contained"
              href="https://wa.me/59178326628"
              sx={{
                mt: 1, mb: 2, borderRadius:'8px',
                width: '12vw',
                // padding: '5px 15px',
                // margin:'5 5px',
                bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'bold', textTransform: 'none',
                ':hover': {
                  bgcolor: 'white',
                  color: '#3C1C91',
                }
              }}
            >
              WhatsApp
            </Button>
            <Button
              startIcon={<HelpCenterIcon />}
              size="small"
              variant="contained"
              target="_blank"
              href="https://racquetsappsuite.com/"
              sx={{
                mt: 1, mb: 4, borderRadius:'8px',
                width: '12vw',
                bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'bold', textTransform: 'none',
                ':hover': {
                  bgcolor: 'white',
                  color: '#3C1C91',
                }
              }}
            >
              FAQs
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}

export default GetawayDetail;