import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { getMatchDetail } from "../api/api";
import { getPlayers } from "../api/api";



const MyCard = ({ match }) => {
  const [detail, setDatail] = useState({});
  const [detail1, setDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [open1,setOpen1]= useState(false);

  const getMatchCard = () => (
    <div>
      <Card
        style={{
          background: match.matchStarted ? "#e2e2e2" : "",
          marginTop: 15,
        }}
      >
        <CardContent>
          <Grid container justify="center" alignItems="center" spacing={4}>
            <Grid item>
              <Typography variant="h5">{match["team-1"]}</Typography>
            </Grid>
            <Grid item>
              <img
                style={{ width: 85 }}
                src={require("../img/vs.png")}
                alt=""
              />
            </Grid>
            <Grid item>
              <Typography variant="h5">{match["team-2"]}</Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Grid container justify="center">
            <Button
              onClick={() => {
                showDetailBtnClicked(match["unique_id"]);
              }}
              variant="outlined"
              color="secondary"
            >
              Show Detail
            </Button>
            <Button
              style={{ marginLeft: 5 }}
              variant="outlined"
              color="primary"
            >
              Starting time {new Date(match.dateTimeGMT).toLocaleString()}
            </Button>
            <Button
              onClick={() => {
                showPlayersBtnClicked(match["unique_id"]);
              }}
              variant="outlined"
              color="secondary"
            >
             Players
             </Button>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );

  const showDetailBtnClicked = (id) => {
    getMatchDetail(id)
      .then((data) => {
        console.log(data);
        setDatail(data);
        handleClickOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const showPlayersBtnClicked = (id) => {
    getPlayers(id)
      .then((data) => {
        console.log(data);
        setDetail(data);
        handleClickOpen1();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };




  return (
    <>
      {match.type == "Twenty20" ? getMatchCard() : ""}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Match Detail..."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>{detail.stat}</Typography>
            <Typography>
              Match
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {detail.matchStarted ? "Started" : "Still not started"}
              </span>
            </Typography>
            <Typography>
              Score
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {" "}
                {detail.score}
              </span>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title1">{"Players Detail..."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>{detail1.stat}</Typography>
            <Typography>
              Batting
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {detail1.matchStarted ? "name" : "Not Found"}
              </span>
            </Typography>
            <Typography>
              Bowling
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {detail1.matchStarted ? "name" : "Not Found"}
              </span>
            </Typography>
            <Typography>
              Fielding
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {detail1.matchStarted ? "name" : "Not Found"}
              </span>
            </Typography>
            <Typography>
              Man of the Match
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {detail1.matchStarted ? "name" : "Not Found"}
              </span>
            </Typography>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyCard;
