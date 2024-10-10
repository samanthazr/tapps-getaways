import React, { useEffect, useState } from 'react';
import { Box, Stack, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';

import AdminSideBar from '../components/AdminSidebar';
import GetawayItem from '../components/GetawayItem';

interface Getaway {
  name: string;
  dates: string;
  description: string;
}

const exampleGetaways: Getaway[] = [
  {
    name: "Tennis with the Stars at Omni Rancho Las Palmas",
    dates: "10-13 de marzo, 2025",
    description: "En el corazón del Valle de Coachella, el Omni Rancho Las Palmas Resort and Spa cuenta con 18 canchas duras. La segunda semana del campamento Indian Wells combina instrucción grupal, alojamiento de lujo, entradas para el BNP Paribas Open y acceso VIP a los jugadores."
  },
  {
    name: "Tennis and Wine Weekend at Ritz-Carlton Santa Bacara",
    dates: "Abril-Octubre, 2025",
    description: "Únete al equipo de Cliff Drysdale Tennis para un fin de semana de tenis y vino en The Ritz-Carlton Bacara, Santa Barbara. Este campamento único te brindará la experiencia definitiva de tenis donde podrás relajarte y disfrutar del tenis como nunca antes."
  },
  {
    name: "Ladies Retreat at Omni Amelia Island",
    dates: "26-30 de marzo, 2025",
    description: "Descubre una escapada incomparable para damas presentada por Cliff Drysdale Tennis. Únete a nosotros para la experiencia definitiva en tenis, gastronomía y lujo en el AAA 4 Diamond Omni Amelia Island Resort."
  },
  {
    name: "Doubles Boot Camp at Carmel Valley Ranch",
    dates: "Abril-Junio, 2025",
    description: "Únete al equipo de Peter Burwash International para el Doubles Boot Camp. Diseñado para elevar tu juego de dobles, este campamento único te enseñará técnicas como la selección inteligente de tiros, cómo ser un atacante implacable y cómo mantener tu posición en dobles."
  },
  {
    name: "Tennis and Wine Weekend at Chateau Elan",
    dates: "Marzo-Noviembre, 2025",
    description: "Únete al equipo de Cliff Drysdale Tennis para un fin de semana de tenis y vino en Chateau Elan, ubicado justo fuera de Atlanta. Este campamento único te brindará la experiencia definitiva de tenis donde podrás relajarte y disfrutar del tenis como nunca antes."
  },
  {
    name: "Pickleball and Wine Weekend at Chateau Elan",
    dates: "16-18 de mayo, 2025",
    description: "Únete al equipo de Cliff Drysdale para un fin de semana de pickleball y vino en Chateau Elan, ubicado justo fuera de Atlanta. Este campamento único te brindará la experiencia definitiva de pickleball donde podrás relajarte y disfrutar en las pintorescas colinas del norte de Georgia."
  }
];

export default function MyGetaways() {
  const [getaways, setGetaways] = useState<Getaway[]>([]);
  const [page, setPage] = useState(1);
  const [apiStatus, setApiStatus] = useState<string | null>(null);
  
  useEffect(() => {
    const storedGetaways = JSON.parse(localStorage.getItem('getaways') || '[]');
    setGetaways(storedGetaways);
  }, []);

  useEffect(() => {
    const fetchGetaways = async () => {
      try {
        const url = 'https://magicloops.dev/api/loop/97000c3a-5bdb-404b-8165-57fa5b149a82/run';
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ input: 'I love Magic Loops!' }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const textResponse = await response.text();
        console.log('Raw API response:', textResponse);

        let responseJson;
        try {
          responseJson = JSON.parse(textResponse);
        } catch (jsonError) {
          if (jsonError instanceof Error) {
            throw new Error(`Error parsing JSON: ${jsonError.message}`);
          } else {
            throw new Error('Unknown error parsing JSON');
          }
        }

        console.log('Parsed API response:', responseJson);
        if (responseJson && responseJson.getaways) {
          setGetaways(responseJson.getaways);
          setApiStatus(null);
        } else if (responseJson && responseJson.input) {
          setApiStatus('API is deactivated. Displaying input payload only.');
          setGetaways([]);
        } else {
          console.error('Unexpected API response:', responseJson);
          setApiStatus('Unexpected API response. Using example data.');
          setGetaways(exampleGetaways);
        }
      } catch (error) {
        console.error('Error fetching getaways:', error);
        setApiStatus('Error fetching getaways. Using example data.');
        setGetaways(exampleGetaways);
      }
    };

    fetchGetaways();
  }, []);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <AdminSideBar />
        <Grid size={{ xs:10 }} spacing={2} justifyContent="center" className="section blueBg">
          <Box>
            <center>
              <h2 className="title">My getaways</h2>
              {apiStatus ? (
                <p>{apiStatus}</p>
              ) : (
                <p>You have {getaways.length} getaways registered</p>
              )}
            </center>
            {getaways.length > 0 ? (
              getaways.map((getaway, index) => (
                <GetawayItem
                  key={index}
                  name={getaway.name}
                  dates={getaway.dates}
                  description={getaway.description}
                />
              ))
            ) : (
              !apiStatus && <p>No getaways available</p>
            )}
          </Box>
          <Stack spacing={2}>
            <p>Page: {page}</p>
            <Pagination shape="rounded" count={5} page={page} onChange={handleChange} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}