<script lang="ts">
declare var mapIsReady: Promise<void>;
</script>
<script setup lang="ts">
import { reactive, ref } from "vue";
const weather = reactive({ data: {} as any });
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${
    import.meta.env.VITE_OPENWEATHER_KEY
  }`
)
  //const weather = await fetch('https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0')
  .then((x) => x.json())
  .then((x) => {
    console.log(x);
    weather.data = Object.entries(x.main);
  });
const location = ref<any>({});
mapIsReady.then(() => {
  var request = {
    query: "Museum of Contemporary Art",
    fields: ["name", "geometry"],
  };
  var service = new google.maps.places.PlacesService(
    document.createElement("div")
  );
  service.findPlaceFromQuery(request, function (results, status) {
    console.log(results);
    location.value = results![0];
  });
});
</script>

<template>
  <div>
    <h1>Hello</h1>

    <table class="table">
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(currency, index) in weather.data">
          <td>{{ currency[0] }}</td>
          <td>{{ currency[1] }}</td>
        </tr>
      </tbody>
    </table>

    {{ location.name }}
    {{ location.geometry.location.lat() }}
    {{ location.geometry.location.lng() }}
  </div>
</template>

<style scoped></style>
