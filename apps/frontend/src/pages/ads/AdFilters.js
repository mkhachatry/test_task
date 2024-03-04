// AdFilters.js

import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import styles from './AdFilters.module.scss';

const AdFilters = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    search: '',
    city: '',
    district: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );

    const queryParams = new URLSearchParams(filteredFilters).toString();
    const url = `${queryParams ? `?${queryParams}` : ''}`;

    onApplyFilters(url);
  };

  return (
    <div className={styles.filterContainer}>
      <Typography variant="h2" className={styles.filterTitle}>Filters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField className={styles.textfield} fullWidth name="minPrice" label="Min Price" value={filters.minPrice} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField className={styles.textfield} fullWidth name="maxPrice" label="Max Price" value={filters.maxPrice} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField className={styles.textfield} fullWidth name="search" label="Search" value={filters.search} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField className={styles.textfield} fullWidth name="city" label="City" value={filters.city} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField className={styles.textfield} fullWidth name="district" label="District" value={filters.district} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Button className={styles.button} fullWidth variant="contained" color="primary" onClick={handleApplyFilters}>Apply Filters</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdFilters;
