import React, { useState } from "react";
import { Container, Grid, Box, Typography, Stack } from "@mui/material";

import HeroBannerImage from "../assets/images/banner.jpg";
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";

function HomePage() {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");

  return (
    <Box sx={{ mt: { lg: "96px", xs: "60px" } }}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                mt: { lg: "212px", xs: "70px" },
                ml: { sm: "50px" },
                position: "relative",
                p: "20px",
                height: "100%",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography color="#FF2625" fontWeight={600} fontSize="26px">
                GetFit
              </Typography>
              <Typography
                fontWeight={700}
                sx={{ fontSize: { lg: "44px", xs: "40px" } }}
                mb="23px"
                mt="30px"
              >
                Push yourself <br />
                beyond limits
              </Typography>
              <Typography
                fontSize="22px"
                fontFamily="Alegreya"
                lineHeight="35px"
              >
                Check out the most effective exercises personalized to you
              </Typography>
              <Stack sx={{ marginTop: "45px" }}>
                <a
                  href="#exercises"
                  style={{
                    textDecoration: "none",
                    width: "200px",
                    textAlign: "center",
                    background: "#FF2625",
                    padding: "14px",
                    fontSize: "22px",
                    textTransform: "none",
                    color: "white",
                    borderRadius: "4px",
                  }}
                >
                  Explore Exercises
                </a>
              </Stack>
              <Typography
                fontWeight={600}
                color="#FF2625"
                sx={{
                  opacity: "0.1",
                  display: { lg: "block", xs: "none" },
                  fontSize: "200px",
                }}
              >
                Exercise
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} lg={6}>
            <img
              src={HeroBannerImage}
              alt="hero-banner"
              className="hero-banner-img"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Grid>
        </Grid>
        <SearchExercises
          setExercises={setExercises}
          exercises={exercises}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
        <Exercises
          setExercises={setExercises}
          bodyPart={bodyPart}
          exercises={exercises}
        />
      </Container>
    </Box>
  );
}

export default HomePage;
