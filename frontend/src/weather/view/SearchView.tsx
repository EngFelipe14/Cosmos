import { Autocomplete, TextField, Button } from "@mui/material";
import municipios from "../../global/data/municipios_colombia.json";
import { useSearchViewModel } from "../viewmodels/useSearchViewModel.ts";
import { WeatherCard } from "../components/WeatherCard.tsx";
import { ForecastList } from "../components/ForecastList.tsx";
import type { Municipio } from "../models/municipio.model.ts";


export default function SearchView() {
  const { selectedMunicipio, setSelectedMunicipio, weather, forecast, handleSearch } =
    useSearchViewModel();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 800, margin: "0 auto" }}>
      <Autocomplete
        options={municipios}
        getOptionLabel={(option: Municipio) => `${option.municipio} (${option.departamento})`}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar municipio"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
        )}
        onChange={(_, value) => setSelectedMunicipio(value)}
      />

      <Button variant="contained" onClick={handleSearch} disabled={!selectedMunicipio}>
        Buscar
      </Button>

      {weather && <WeatherCard weather={weather} municipio={selectedMunicipio!.municipio} />}
      {forecast && <ForecastList forecast={forecast} />}
    </div>
  );
}
