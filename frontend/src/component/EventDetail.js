import React, { useState } from 'react';
import { Button } from 'reactstrap';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns'; 
// import {
// 	MuiPickersUtilsProvider,
// 	KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
// //import InputAdornment from "@material-ui/core/InputAdornment";

export default function EventDetail({eventTitle, eventStartTimestamp, eventDuration, roundMaxPt, fastestRound, maintainenceHr}) {

	const [eventDetail, setEventDetail] = useState({
		eventTitle, 
		eventStartTimestamp, 
		eventDuration, 
		roundMaxPt, 
		fastestRound,
		maintainenceHr
	});
	// const [event_Title, setEventTitle] = useState(eventTitle);
	// const [eventStartTS, setEventStartTS] = useState(eventStartTimestamp);
	// const [eventDur, setEventDur] = useState(eventDuration);
	// const [roundMaxPoint, setRoundMaxPoint] = useState(roundMaxPt);
	// const [fastestRd, setFastestRd] = useState(fastestRound);

	var event_Title = eventTitle;
	var eventStartTS = eventStartTimestamp;
	var eventDur = eventDuration;
	var roundMaxPoint = roundMaxPt;
	var fastestRd = fastestRound;
	var maintainHr = maintainenceHr;

	// This function is use to update parent component
	function onEventDetailChange(event) {
		setEventDetail({
			event_Title, 
			eventStartTS, 
			eventDur, 
			roundMaxPoint, 
			fastestRd
		});
	}

	// Immediately Update So I don't want to use synchronized setState.
	function onEventTitleChange(event) {
		event_Title = event.target.value;
	}

	function onEventStartTSChange(event) {
		//eventStartTS = event.target.value;
		 var datum = new Date(event.target.value).getTime()/1000;
		 console.log(datum);
		 eventStartTS = datum;
	}

	function onEventDurationChange(event) {
		eventDur = parseInt(event.target.value);
	}

	function onRoundMaxPointChange(event) {
		roundMaxPoint = parseInt(event.target.value);
	}

	function onFastestRoundChange(event) {
		fastestRd = parseInt(event.target.value);
	}

	function onMaintainHrChange(event) {
		maintainHr = parseFloat(event.target.value);
	}

	function convertTSForDatePicker(timestamp) {
		var dt = new Date(timestamp * 1000);
		var yy = dt.getFullYear();
		var mm = dt.getMonth()+1;
		var dd = dt.getDate();
		var hh = dt.getHours();
		var min = dt.getMinutes();
		var result = (yy+'-'+(mm<10?'0'+mm:mm)+'-'+(dd<10?'0'+dd:dd)+'T'+(hh<10?'0'+hh:hh)+':'+(min<10?'0'+min:min));
		//console.log(result);
		return result;
	}

	const useStyles = makeStyles(theme => ({
		root: {
			width: "calc(240px + 30%)",
			alignItems: 'right'
		},
		heading: {
			fontSize: theme.typography.pxToRem(15)
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary
		},
		icon: {
			verticalAlign: "bottom",
			height: 20,
			width: 20
		},
		details: {
			alignItems: "center"
		},
		column: {
			flexBasis: "100%"
		},
		smallcol: {
			flexBasis: "20%"
		},
		midcol: {
			flexBasis: "30%"
		},
		helper: {
			borderLeft: `2px solid ${theme.palette.divider}`,
			padding: theme.spacing(1, 2)
		},
		link: {
			color: theme.palette.primary.main,
			textDecoration: "none",
			"&:hover": {
				textDecoration: "underline"
			}
		}
	}));
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<ExpansionPanel>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
          <Typography className={classes.heading}><b>展開更新活動資訊</b></Typography>
				</ExpansionPanelSummary>

				<ExpansionPanelDetails>
					<FormControl fullWidth className={classes.margin}>
						<InputLabel htmlFor="event-title">活動標題</InputLabel>
						<Input
							id="event-title"
							defaultValue={event_Title}
							onChange={onEventTitleChange}
						/>
        	</FormControl>
				</ExpansionPanelDetails>
				<ExpansionPanelDetails>
					<FormControl fullWidth className={classes.margin}>
						<TextField
							id="event-duration"
							label="活動時長"		
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{ min: "0", max: "500", step: "1" }}
							defaultValue={parseInt(eventDur)}
							onChange={onEventDurationChange}
						/>
					</FormControl>
					<FormControl fullWidth className={classes.margin}>
						<TextField
							id="round-max-pt"
							label="周回理論PT"		
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{ min: "1", max: "49999", step: "10" }}
							defaultValue={parseInt(roundMaxPoint)}
							onChange={onRoundMaxPointChange}
						/>
					</FormControl>
					<FormControl fullWidth className={classes.margin}>
						<TextField
							id="fastest-round"
							label="周回秒數"		
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{ min: "1", max: "300", step: "1" }}
							defaultValue={parseInt(fastestRd)}
							onChange={onFastestRoundChange}
						/>
					</FormControl>
					<FormControl fullWidth className={classes.margin}>
						<TextField
							id="maintain-hours"
							label="維修補正"		
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{ min: "0", max: "500", step: "0.01" }}
							defaultValue={parseFloat(maintainHr)}
							onChange={onMaintainHrChange}
						/>
					</FormControl>
				</ExpansionPanelDetails>
				<ExpansionPanelDetails>
					<FormControl fullWidth className={classes.margin}>
						{/* <div className={classes.midcol}> */}
							<TextField
								id="event-start-date-time"
								label="活動開始日時"
								type="datetime-local"
								defaultValue={convertTSForDatePicker(eventStartTS)}
								onChange={onEventStartTSChange}
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						{/* </div> */}
					</FormControl>
				</ExpansionPanelDetails>
				<Divider />
					<div className={classes.smallcol}>
						<ExpansionPanelActions>
							<Button size="small" color="primary" onClick={onEventDetailChange}>
								更新活動資訊
							</Button>
						</ExpansionPanelActions>
					</div>
			</ExpansionPanel>
		</div>
	);
}