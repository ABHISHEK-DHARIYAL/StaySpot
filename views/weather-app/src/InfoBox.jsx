import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import WbSunnyIcon from "@mui/icons-material/Sunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/CloudySnowing";
import "./InfoBox.css";

export default function InfoBox({ info }) {
  const Init_Url =
    "https://images.unsplash.com/photo-1528083526517-4fc9fd9431f8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Rainy/Storm
  const HOT_URL =
    "https://plus.unsplash.com/premium_photo-1754341346747-4478951b7b5b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Sunny/Hot
  const COLD_URL =
    "https://images.unsplash.com/photo-1644716276377-59d4908d3729?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Cold/Snowy

  return (
    <div className="InfoBox">
      <h2>Weather Info - {info.weather}</h2>
      <div className="cardContainer">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              sx={{ height: 140 }}
              image={
                info.humidity > 80
                  ? Init_Url
                  : info.temp > 15
                  ? HOT_URL
                  : COLD_URL
              }
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.15)",
                  padding: "6px 12px",
                  borderRadius: "12px",
                  margin: "4px",
                  color: "black",
                  fontWeight: 500,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {info.city}{" "}
                {info.humidity > 80 ? (
                  <ThunderstormIcon />
                ) : info.temp > 15 ? (
                  <WbSunnyIcon />
                ) : (
                  <AcUnitIcon />
                )}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.15)",
                    padding: "6px 12px",
                    borderRadius: "12px",
                    margin: "4px",
                    color: "black",
                    fontWeight: 500,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  Temperature = {info.temp}&deg;C
                </span>
                <br />
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.15)",
                    padding: "6px 12px",
                    borderRadius: "12px",
                    margin: "4px",
                    color: "black",
                    fontWeight: 500,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  Humidity = {info.humidity}
                </span>
                <br />
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.15)",
                    padding: "6px 12px",
                    borderRadius: "12px",
                    margin: "4px",
                    color: "black",
                    fontWeight: 500,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  Min Temp = {info.tempMin}&deg;C
                </span>
                <br />
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.15)",
                    padding: "6px 12px",
                    borderRadius: "12px",
                    margin: "4px",
                    color: "black",
                    fontWeight: 500,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  Max Temp = {info.tempMax}&deg;C
                </span>
                <br />
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.15)",
                    padding: "6px 12px",
                    borderRadius: "12px",
                    margin: "4px",
                    color: "black",
                    fontWeight: 500,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  The Weather can be described as <i>{info.weather}</i>
                  and feels like {info.feelsLike}&deg;C
                </span>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}
