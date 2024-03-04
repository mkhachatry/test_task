import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography, Paper, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import styles from './AdDetailPage.module.scss';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';

const AdDetailPage = () => {
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const fetchData = async () => {
    if (params?.id) {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/ads/${params?.id}`);
        setItemData(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  return (
    <div className={styles.adDetailContainer}>
      {loading && <CircularProgress />}
      {itemData && (
        <Paper className={styles.adDetailContent}>
          <Link href="/ads">Back</Link>
          <div className={styles.adDetailCarousel}>
            <img src={itemData.images[0].image} alt="Ad" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
          <Typography variant="h1" className={styles.adDetailTitle}>{itemData.title}</Typography>
          <div className={styles.adDetailActions}>
            <div>
              <Typography variant="subtitle1" className={styles.adDetailLocation}>
                {itemData.city_name}, {itemData.district_name}
              </Typography>
              <Typography variant="subtitle1">{itemData.price}</Typography>
            </div>
            <Button variant="contained" color="primary">Like</Button>
          </div>
          <div dangerouslySetInnerHTML={{__html:itemData.description}}></div>
        </Paper>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdDetailPage;
