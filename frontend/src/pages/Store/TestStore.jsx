import { useState } from "react";
import React from "react";
import {
  Container,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  Button,
  Checkbox,
  Select,
  MenuItem,
  IconButton,
  Box,
  InputLabel,
  Paper,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

export default function TestStore() {
//   const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [category, setCategory] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [locationAvailabilityPANIndia, setLocationAvailabilityPANIndia] = useState(false);
  const [defaultCancellable, setDefaultCancellable] = useState(false);
  const [defaultReturnable, setDefaultReturnable] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [building, setBuilding] = useState("");
  const [code, setCode] = useState("");
  const [locality, setLocality] = useState("");
  const [logoURL, setLogoURL] = useState("");
  const [networkLogistics, setNetworkLogistics] = useState("");
  const [logisticsBppId, setLogisticsBppId] = useState("");
  const [logisticsDeliveryType, setLogisticsDeliveryType] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [selfPickupChecked, setSelfPickupChecked] = useState(false);
  const [deliveryEmail, setDeliveryEmail] = useState("");
  const [deliveryContactNumber, setDeliveryContactNumber] = useState("");
  const [selfPickupEmail, setSelfPickupEmail] = useState("");
  const [selfPickupContactNumber, setSelfPickupContactNumber] = useState("");
  const [cites, setCites] = useState("");
  const [serviceableRadius, setServiceableRadius] = useState("");
  const [storeStatus, setStoreStatus] = useState("");
    const [holidays, setHolidays] = useState([]);
    const [daysTimings, setDaysTimings] = useState([
        { daysRange: { from: 1, to: 5 }, timings: [{ from: '', to: '' }] },
    ]);
    const [closedDays, setClosedDays] = useState({ from: 1, to: 5 });
    const [closedTimings, setClosedTimings] = useState({ from: '00:00', to: '00:00' });


      // Handle store status

  const handleNetworkLogistics = (event) => {
    setNetworkLogistics(event.target.value);
  };

  const handleDefaultCancellableChange = (event) => {
    setDefaultCancellable(event.target.value === "true");
  };

  const handleReturnChange = (event) => {
    setDefaultReturnable(event.target.value === "true");
  };

  const handleDeliveryChange = (event) => {
    setDeliveryChecked(event.target.checked);
  };

  const handleSelfPickupChange = (event) => {
    setSelfPickupChecked(event.target.checked);
  };

  const handleLocationChange = (event) => {
    setLocationAvailabilityPANIndia(event.target.value === "true");
  };

// sore timing handle 
const handleStoreStatus = (event) => {
  setStoreStatus(event.target.value);
  setHolidays([]);  // Clear holidays when status changes
};

// Add and remove timings for enabled status
const handleDaysChange = (index, field, value) => {
  const newDaysTimings = [...daysTimings];
  newDaysTimings[index].daysRange[field] = value;
  setDaysTimings(newDaysTimings);
};

const handleTimingChange = (daysIndex, timingIndex, field, value) => {
  const newDaysTimings = [...daysTimings];
  newDaysTimings[daysIndex].timings[timingIndex][field] = value;
  setDaysTimings(newDaysTimings);
};

const addTiming = (index) => {
  const newDaysTimings = [...daysTimings];
  newDaysTimings[index].timings.push({ from: '', to: '' });
  setDaysTimings(newDaysTimings);
};

const removeTiming = (daysIndex, timingIndex) => {
  const newDaysTimings = [...daysTimings];
  newDaysTimings[daysIndex].timings = newDaysTimings[daysIndex].timings.filter((_, i) => i !== timingIndex);
  setDaysTimings(newDaysTimings);
};

const addDaysTimings = () => {
  setDaysTimings([...daysTimings, { daysRange: { from: 1, to: 5 }, timings: [{ from: '', to: '' }] }]);
};

const removeDaysTimings = (index) => {
  const newDaysTimings = daysTimings.filter((_, i) => i !== index);
  setDaysTimings(newDaysTimings);
};

// Handle closed timings and days
const handleClosedDaysChange = (field, value) => {
  setClosedDays({ ...closedDays, [field]: value });
};

const handleClosedTimingsChange = (field, value) => {
  setClosedTimings({ ...closedTimings, [field]: value });
};

const formattedHolidays = holidays.map((date) => {
  // Check if date is already in string format or an object and format it
  if (typeof date === 'string') {
      return date;  // Assuming it's already in 'YYYY-MM-DD' format
  } else if (date instanceof Date) {
      return date.toISOString().split('T')[0];  // Convert Date to 'YYYY-MM-DD'
  } else if (date.year && date.month && date.day) {
      // Handle multi-date-picker object format
      const year = date.year;
      const month = String(date.month).padStart(2, '0');
      const day = String(date.day).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }
  return date;  // Fallback
});


const storePayload={
  storeDetails: {
  category,
    logoURL,
      location: {
        lat,
        long,
      },
      locationAvailabilityPANIndia,
      defaultCancellable,
      defaultReturnable,
      fulfillments: [
        ...(deliveryChecked
          ? [
            {
              type: "delivery",
              contact: {
                email: deliveryEmail,
                phone: deliveryContactNumber,
              },
            },
          ]
          : []),
        ...(selfPickupChecked
          ? [
            {
              type: "self-pickup",
              contact: {
                email: selfPickupEmail,
                phone: selfPickupContactNumber,
              },
            },
          ]
          : []),
      ],
      Address: {
        country,
        state,
        city,
        building,
        code,
        locality,
      },
      supportDetails: {
      email,
      mobile,
    },
 
      logisticsDeliveryType,
      logisticsBppId: networkLogistics === "on" ? logisticsBppId : null,
      deliveryTime: networkLogistics !== "on" ? deliveryTime : null,
  
    storeTimings: {
      status: storeStatus,
      holidays: formattedHolidays,
      enabled: storeStatus === "enabled" ? daysTimings : [],
      closed: storeStatus === "temporarilyClosed" ? closedTimings : {},
      closedDays: storeStatus === "temporarilyClosed" ? closedDays : {}
  }
  }
}

  // const submitHandler = async (e) => {
  //   e.preventDefault();


  //   console.log(storeDetails);
  //   // Example for sending data to backend
  //   try {
  //     const token = Cookies.get("token");
  //     console.log("update api token",token);
  //     const response = await fetch("http://localhost:8080/dashboard/adminStoreDetails",{
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "authorization": token
  //       },
  //       body: JSON.stringify({ storeDetails})
  //     });
  
  //     const Data = await response.json();
  //     console.log("data",Data);
  
  //     if (Data.success === true) {
  //       navigate("/");
  //     } else {
  //       console.log(" failed");
  //     }
  //   } catch (error) {
  //     console.error("error:", error);
  //   }
  // };  
  const submitHandler = async (e) => {
    e.preventDefault();
  
    console.log(storePayload);
  
    try {
      const token = Cookies.get("token");
      console.log("update api token", token);
  
      const response = await fetch("http://localhost:8080/dashboard/adminStoreDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${token}`,  // Use Bearer schema
        },
        body: JSON.stringify(storePayload),  // Send storeDetails directly
      });
  
      const data = await response.json();
      console.log("data", data);
  
      if (data.success===true) {
        // navigate("/");
      } else {
        console.log("Request failed", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const format = "MM/DD/YYYY";


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Store Details
      </Typography>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
              <input
                type="file"
                required
                label="Logo URL"
                name="logo"
                value={logoURL}
                onChange={(e) => setLogoURL(e.target.value)}
              />
            </Grid>
            <Typography variant="h4" gutterBottom textAlign="center">
              Logistics Details
            </Typography>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Network Logistics</FormLabel>
                <RadioGroup
                  row
                  aria-label="Network Logistics"
                  name="networkLogistics"
                  value={networkLogistics}
                  onChange={handleNetworkLogistics}
                >
                  <FormControlLabel value="on" control={<Radio />} label="On" />
                  <FormControlLabel
                    value="off"
                    control={<Radio />}
                    label="Off"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel>Logistics Delivery Type</FormLabel>
                <select
                  placeholder="Choose your Product"
                  onChange={(e) => setLogisticsDeliveryType(e.target.value)}
                  value={logisticsDeliveryType}
                  style={{ width: "100%", padding: "10px" }}
                >
                  <option value="">Select a delivery type</option>
                  <option value="Express">Express</option>
                  <option value="Standard">Standard</option>
                </select>
              </FormControl>
            </Grid>

            {networkLogistics === "on" ? (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Logistics Bpp Id"
                  name="logisticsBppId"
                  value={logisticsBppId}
                  onChange={(e) => setLogisticsBppId(e.target.value)}
                />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Delivery Time"
                  name="deliveryTime"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                />
              </Grid>
            )}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Support Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Support Phone"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Category</FormLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: "100%", padding: "10px" }}
              >
                <MenuItem value="">Select a category</MenuItem>
                <MenuItem value="Grocery">Grocery</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Logistic">Logistic</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Latitude"
              name="lat"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Longitude"
              name="long"
              value={long}
              onChange={(e) => setLong(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Location Availability</FormLabel>
              <RadioGroup
                row
                aria-label="location-availability"
                name="location-availability"
                value={locationAvailabilityPANIndia}
                onChange={handleLocationChange}
              >
                <FormControlLabel value={true} control={<Radio />} label="PAN India" />
                <FormControlLabel value="City" control={<Radio />} label="City" />
                <FormControlLabel value="Radius" control={<Radio />} label="Radius" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {locationAvailabilityPANIndia === "City" && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel>Select Cities</FormLabel>
                <Select
                  value={cites}
                  onChange={(e) => setCites(e.target.value)}
                  style={{ width: "100%", padding: "10px" }}
                >
                  <MenuItem value="">Select a City</MenuItem>
                  <MenuItem value="Delhi">Delhi</MenuItem>
                  <MenuItem value="Pune">Pune</MenuItem>
                  <MenuItem value="Noida">Noida</MenuItem>
                  <MenuItem value="Kolkata">Kolkata</MenuItem>
                  <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          {locationAvailabilityPANIndia === "Radius" && (
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Serviceable Radius (in KM)"
                name="serviceableRadius"
                value={serviceableRadius}
                onChange={(e) => setServiceableRadius(e.target.value)}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Default Cancellable Setting</FormLabel>
              <RadioGroup
                row
                aria-label="defaultCancellable"
                name="defaultCancellable"
                value={defaultCancellable}
                onChange={handleDefaultCancellableChange}
              >
                <FormControlLabel value={true} control={<Radio />} label="Cancellable" />
                <FormControlLabel value={false} control={<Radio />} label="Non-Cancellable" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Default Returnable Setting</FormLabel>
              <RadioGroup
                row
                aria-label="returnable"
                name="returnable"
                value={defaultReturnable}
                onChange={handleReturnChange}
              >
                <FormControlLabel value={true} control={<Radio />} label="Returnable" />
                <FormControlLabel value={false} control={<Radio />} label="Non-Returnable" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="State"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="City"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Building"
              name="building"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Postal Code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Locality"
              name="locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox checked={deliveryChecked} onChange={handleDeliveryChange} />
              }
              label="Enable Delivery"
            />
          </Grid>
          {deliveryChecked && (
            <>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Delivery Contact Email"
                  name="deliveryEmail"
                  value={deliveryEmail}
                  onChange={(e) => setDeliveryEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Delivery Contact Number"
                  name="deliveryContactNumber"
                  value={deliveryContactNumber}
                  onChange={(e) => setDeliveryContactNumber(e.target.value)}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selfPickupChecked}
                  onChange={handleSelfPickupChange}
                />
              }
              label="Enable Self Pickup"
            />
          </Grid>
          {selfPickupChecked && (
            <>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Self Pickup Contact Email"
                  name="selfPickupEmail"
                  value={selfPickupEmail}
                  onChange={(e) => setSelfPickupEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Self Pickup Contact Number"
                  name="selfPickupContactNumber"
                  value={selfPickupContactNumber}
                  onChange={(e) => setSelfPickupContactNumber(e.target.value)}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
                Store Timing
            </Typography>

            <Grid item xs={12}>
                <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>Store Status</FormLabel>
                    <RadioGroup
                        row
                        aria-label="Store Status"
                        name="storeStatus"
                        value={storeStatus}
                        onChange={handleStoreStatus}
                    >
                        <FormControlLabel
                            value="enabled"
                            control={<Radio />}
                            label="Enabled"
                        />
                        <FormControlLabel
                            value="temporarilyClosed"
                            control={<Radio />}
                            label="Temporarily Closed"
                        />
                        <FormControlLabel
                            value="disabled"
                            control={<Radio />}
                            label="Disabled"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>

            {/* Enabled Status */}
            {storeStatus === "enabled" && (
                <>
                    <Grid item xs={12}>
                        <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>Holidays</FormLabel>
                            <Box sx={{ marginTop: 2, minWidth: '200px' }}>
                                <DatePicker
                                    label="Holidays"
                                    value={holidays}
                                    onChange={setHolidays}
                                    multiple
                                    sort
                                    format={format}
                                    calendarPosition="bottom-center"
                                    plugins={[<DatePanel key="date-panel" />]}
                                    style={{ width: "100%" }}
                                />
                            </Box>
                        </FormControl>
                    </Grid>

                    {daysTimings.map((dayTiming, daysIndex) => (
                        <Paper key={daysIndex} sx={{ p: 2, mb: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={5}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel id={`days-from-label-${daysIndex}`}>Days From</InputLabel>
                                        <Select
                                            labelId={`days-from-label-${daysIndex}`}
                                            value={dayTiming.daysRange.from}
                                            onChange={(e) => handleDaysChange(daysIndex, 'from', e.target.value)}
                                        >
                                            <MenuItem value={1}>Monday</MenuItem>
                                            <MenuItem value={2}>Tuesday</MenuItem>
                                            <MenuItem value={3}>Wednesday</MenuItem>
                                            <MenuItem value={4}>Thursday</MenuItem>
                                            <MenuItem value={5}>Friday</MenuItem>
                                            <MenuItem value={6}>Saturday</MenuItem>
                                            <MenuItem value={7}>Sunday</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel id={`days-to-label-${daysIndex}`}>Days To</InputLabel>
                                        <Select
                                            labelId={`days-to-label-${daysIndex}`}
                                            value={dayTiming.daysRange.to}
                                            onChange={(e) => handleDaysChange(daysIndex, 'to', e.target.value)}
                                        >
                                            <MenuItem value={1}>Monday</MenuItem>
                                            <MenuItem value={2}>Tuesday</MenuItem>
                                            <MenuItem value={3}>Wednesday</MenuItem>
                                            <MenuItem value={4}>Thursday</MenuItem>
                                            <MenuItem value={5}>Friday</MenuItem>
                                            <MenuItem value={6}>Saturday</MenuItem>
                                            <MenuItem value={7}>Sunday</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton onClick={() => removeDaysTimings(daysIndex)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>

                            {dayTiming.timings.map((timing, timingIndex) => (
                                <Grid container spacing={2} alignItems="center" key={timingIndex}>
                                    <Grid item xs={5}>
                                        <TextField
                                            label="From"
                                            type="time"
                                            fullWidth
                                            value={timing.from}
                                            onChange={(e) => handleTimingChange(daysIndex, timingIndex, 'from', e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            sx={{ mt: 2 }}
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            label="To"
                                            type="time"
                                            fullWidth
                                            value={timing.to}
                                            onChange={(e) => handleTimingChange(daysIndex, timingIndex, 'to', e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            sx={{ mt: 2 }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton onClick={() => removeTiming(daysIndex, timingIndex)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}

                            <Box textAlign="right">
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => addTiming(daysIndex)}
                                >
                                    Add Timing
                                </Button>
                            </Box>
                        </Paper>
                    ))}

                    <Box textAlign="right" mb={2}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={addDaysTimings}
                        >
                            Add Days Range
                        </Button>
                    </Box>
                </>
            )}

            {/* Temporarily Closed Status */}
            {storeStatus === "temporarilyClosed" && (
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="closed-days-from-label">Days From</InputLabel>
                                <Select
                                    labelId="closed-days-from-label"
                                    value={closedDays.from}
                                    onChange={(e) => handleClosedDaysChange('from', e.target.value)}
                                >
                                    <MenuItem value={1}>Monday</MenuItem>
                                    <MenuItem value={2}>Tuesday</MenuItem>
                                    <MenuItem value={3}>Wednesday</MenuItem>
                                    <MenuItem value={4}>Thursday</MenuItem>
                                    <MenuItem value={5}>Friday</MenuItem>
                                    <MenuItem value={6}>Saturday</MenuItem>
                                    <MenuItem value={7}>Sunday</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="closed-days-to-label">Days To</InputLabel>
                                <Select
                                    labelId="closed-days-to-label"
                                    value={closedDays.to}
                                    onChange={(e) => handleClosedDaysChange('to', e.target.value)}
                                >
                                    <MenuItem value={1}>Monday</MenuItem>
                                    <MenuItem value={2}>Tuesday</MenuItem>
                                    <MenuItem value={3}>Wednesday</MenuItem>
                                    <MenuItem value={4}>Thursday</MenuItem>
                                    <MenuItem value={5}>Friday</MenuItem>
                                    <MenuItem value={6}>Saturday</MenuItem>
                                    <MenuItem value={7}>Sunday</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Closed From"
                                type="time"
                                fullWidth
                                value={closedTimings.from}
                                onChange={(e) => handleClosedTimingsChange('from', e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ mt: 2 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Closed To"
                                type="time"
                                fullWidth
                                value={closedTimings.to}
                                onChange={(e) => handleClosedTimingsChange('to', e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ mt: 2 }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            )}

          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
