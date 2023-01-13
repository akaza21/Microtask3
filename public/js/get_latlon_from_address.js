

window.onload = function () {
  let form = document.forms.getLatLong;

  form.addEventListener("submit", (e) => {
    let formdata = new FormData(form);
    console.log(formdata);
    e.preventDefault();
    let street =formdata.get("landmark").toLowerCase()
    let city = formdata.get("city").toLowerCase()
    let state = formdata.get("state").toLowerCase()
    let country = formdata.get("country").toLowerCase()
    let postalcode = formdata.get("postalcode")
    getLatLong(
      street,
      city,
      state,
      country,
      postalcode
    ).then((res)=>{

        document.getElementById("latlong").style.display = "flex"
        console.log(res);
        document.getElementById("your-latlong").innerHTML = "Latitude : " +  res[0].lat + ' ' + "Longitude : " + res[0].lon
    })
  });
};


const getLatLong  = async (street, city, state, country, postalcode) => {
  console.log(street, city, state, country, postalcode);

  try {
    let res = await fetch(
      `https://nominatim.openstreetmap.org/search?street=${street}{city=${city}&state=${state}&country=${country}&postalcode=${postalcode}&format=json`
    );
    res = await res.json();
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}