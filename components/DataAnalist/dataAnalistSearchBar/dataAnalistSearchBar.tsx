import { Select, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { backfaceFixed } from '../../../lib/backFaceFixed';
import { FamilyModal } from '../../parts';
import { Button } from '../../utils';
import Styles from './dataAnalistSearchBar.module.css';

export default function DataAnalistSearchBar({
  setGender,
  setAge,
  setAlive,
  setJob,
  setFamily,
  familyModal,
  setFamilyModal,
}) {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {};

  const jobs = [
    '農林業・水産業・鉱業',
    '建設・土木・工業',
    '電子部品・デバイス・電子回路製造業',
    '情報通信機械器具製造業',
    'その他製造業',
    '電気・ガス・熱供給・水道業',
    '通信業',
    '情報サービス業',
    'その他の情報通信業',
    '運輸業・郵便業',
    '卸売業・小売業',
    '金融業・保険業',
    '不動産業・物品賃貸業',
    '学術研究・専門技術者',
    '宿泊業・飲食サービス業',
    '生活関連サービス業・娯楽業',
    '教育・学習支援業',
    '医療・福祉業',
    '複合サービス業',
    'その他サービス業',
  ];

  const openFamilyModal = async () => {
    await backfaceFixed(true);
    await setFamilyModal(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={Styles.display_flex_column}>
          <div className={Styles.display_flex}>
            <label className={Styles.flex_container_item}>
              性別
              <Select onChange={(e) => setGender(e.target.value)}>
                <MenuItem defaultValue=''>未選択</MenuItem>
                <MenuItem value='man'>男性</MenuItem>
                <MenuItem value='woman'>女性</MenuItem>
                <MenuItem value='other'>その他</MenuItem>
              </Select>
            </label>
            <label className={Styles.flex_container_item}>
              年代
              <Select onChange={(e) => setAge(e.target.value)}>
                <MenuItem defaultValue=''>未選択</MenuItem>
                <MenuItem value={10}>10代</MenuItem>
                <MenuItem value={20}>20代</MenuItem>
                <MenuItem value={30}>30代</MenuItem>
                <MenuItem value={40}>40代</MenuItem>
                <MenuItem value={50}>50代</MenuItem>
                <MenuItem value={60}>60代</MenuItem>
                <MenuItem value={70}>70代</MenuItem>
                <MenuItem value={80}>80代</MenuItem>
                <MenuItem value={90}>90代</MenuItem>
                <MenuItem value={100}>100代</MenuItem>
              </Select>
            </label>
            <label className={Styles.flex_container_item}>
              alive
              <Select onChange={(e) => setAlive(e.target.value)}>
                <MenuItem defaultValue=''>未選択</MenuItem>
                <MenuItem value={'true'}>alive</MenuItem>
                <MenuItem value={'false'}>dead</MenuItem>
              </Select>
            </label>
          </div>
          <div className={Styles.display_flex}>
            <label className={Styles.search_input_job}>
              職種
              <Select onChange={(e) => setJob(e.target.value)}>
                <MenuItem defaultValue=''>未選択</MenuItem>
                {jobs.map((job) => {
                  return (
                    <MenuItem key={job} value={job}>
                      {job}
                    </MenuItem>
                  );
                })}
              </Select>
            </label>
            <div className={Styles.flex_container_item}>
              <Button onClick={() => openFamilyModal()}>家族構成</Button>
            </div>
          </div>
        </div>
      </form>
      <FamilyModal
        familyModal={familyModal}
        setFamilyModal={setFamilyModal}
        setFamily={setFamily}
      />
    </div>
  );
}
