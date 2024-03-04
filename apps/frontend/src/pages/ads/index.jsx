import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Grid, Paper, CircularProgress } from '@mui/material';
import AdFilters from './AdFilters';
import AdCard from './AdCard';
import styles from './AdsList.module.scss';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAds = useCallback(async (filters) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const { data } = await axios.get(`/api/ads?${queryParams}`);

      if(data.results)
      {
        setAds(data.results);
      }
      
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  return (
    <div className={styles.root}>
      <Typography variant="h1">List of ads</Typography>
      <Paper className={styles.filtersContainer}>
        <AdFilters onApplyFilters={fetchAds} />
      </Paper>
      <Grid  className={styles.cardItemsContainer} justifyContent="center" alignItems="center">
        {loading && <CircularProgress />}
        {ads.map((ad) => (
          <Grid className={styles.cardItems} key={ad.id} item xs={12} sm={6} md={4} lg={3} justifyContent="center">
            
            <AdCard ad={ad} />
          </Grid>
        ))}
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default AdsList;
