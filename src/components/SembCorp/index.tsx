import React, { useEffect, useState } from 'react'
import { MDBContainer } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { fetchWeatherData,getLoadingStatus,getWeatherData } from '../../features/weather/weatherSplice';
import { store } from '../../app/store';
import ReactECharts from 'echarts-for-react';
import './index.css'

type plotDataType = {
  DAYData: {
    unit: any;
    data: any;
  };
  HOURData: {
    unit: any;
    data: any;
  };
};
const SembCorpPage = () => {
  // ------------
  const [plotData,setPlotData] = useState<plotDataType|null>(null);
  // ------------
  let startedHandlerTimer = false;  
  let weatherData = useSelector(getWeatherData);
  let loadingStatus = useSelector(getLoadingStatus);
  // ------------
  useEffect(()=>{
    // TO START THE HANDLER ONLY ONCE
    // REACT 18 HAS CONCURRENT MODE 
    // THAT LOAD THE USEEFFEC TWICE
    if (!startedHandlerTimer) {
      handlerTimer();
      startedHandlerTimer = true;
    }
  },[]);
  useEffect(()=>{
    if(weatherData?.daily) {
      setPlotData({
        DAYData: {unit:weatherData['daily_units'],data:weatherData['daily']},
        HOURData: {unit:weatherData['hourly_units'],data:weatherData['hourly']}
      })
    }
  },[weatherData])
  // --------------------
  function handlerTimer() {
    // CALL ACTION IN REDUX TO FETCH DATA
    store.dispatch(fetchWeatherData());
    // TIMER TO UPDATE OF DATA
    // setTimeout(handlerTimer,1000*60*5)
  };
  const getStatus = () => {
    let latitude = weatherData?.latitude;
    let longitude = weatherData?.longitude;
    let timezone = weatherData?.timezone;
    let elevation = weatherData?.elevation;
    let remark = loadingStatus === 'succeeded' ? 'LOADING SUCCESS' : 'LOADING FAIL : RETRIEVE FROM LOCAL STORAGE';
    return !timezone ? 'LOADING..' : 
      <>
      <p>{remark}</p>
      <p>TIMEZONE={timezone}</p>
      <p>ELEVATION={elevation}</p>
      <p>LONG={longitude} LAT={latitude}</p>
      <hr/>
      </>
  }
  // -----------------
  function getDAYDataSeries() {
    // -----------------
    let _SeriesData:any = [];
    let _legendData:any = [];
    const categoryData:any = [];
    // ---------------------
    let _rslt1:any = [];
    let _rslt2:any = [];
    // ----------------
    // POPULATE DATASET
    // ----------------
    let DAYDataKeys = plotData?.DAYData ? Object.keys(plotData['DAYData']['unit']) : null;
    let DAYDataTime = plotData?.DAYData ? plotData['DAYData']['data']['time'] : null;
    let variable1 = DAYDataKeys?.[1] ?? null;
    let variable2 = DAYDataKeys?.[2] ?? null;
    let tempMAXData = plotData && plotData.DAYData && plotData.DAYData.data? plotData.DAYData.data?.[variable1 ?? ''] : undefined;
    let tempMINData = plotData && plotData.DAYData && plotData.DAYData.data? plotData.DAYData.data?.[variable2 ?? ''] : undefined;
    // -----------
    DAYDataTime && DAYDataTime.map((objDateTime: any, index: any) => {
      let _DATETIME:any = new Date(objDateTime)
      _rslt1.push([_DATETIME,tempMAXData[index]]);
      _rslt2.push([_DATETIME,tempMINData[index]]);
    });
    // -------------------------
    let _object1,_object2;
    _object1 = { name : variable1,type : 'line',smooth: false,
      symbol: 'none',data : _rslt1,duration: 100,
    }
    _object2 = { name : variable2,type : 'line',smooth: false,
      symbol: 'none',data : _rslt2,duration: 100,
    }
    _SeriesData.push(_object1);
    _SeriesData.push(_object2);
    _legendData.push(variable1,variable2);
    // --------------
    return { legendData:_legendData ,categoryData, valueData:_SeriesData}
  }
  function getHOURDataSeries(nPlot) {
    // -----------------
    let _SeriesData:any = [];
    let _legendData:any = [];
    const categoryData:any = [];
    // ---------------------
    let _rslt1:any = [];
    // ----------------
    // POPULATE DATASET
    // ----------------
    let HOURDataKeys = plotData?.HOURData ? Object.keys(plotData['HOURData']['unit']) : null;
    let HOURDataTime = plotData?.HOURData ? plotData['HOURData']['data']['time'] : null;
    let variable = HOURDataKeys?.[nPlot] ?? null;
    let echartPlotData = plotData?.HOURData?.data?.[variable ?? ''] ?? undefined;
    // -----------
    HOURDataTime && HOURDataTime.map((objDateTime: any, index: any) => {
      let _DATETIME:any = new Date(objDateTime)
      _rslt1.push([_DATETIME,echartPlotData[index]]);
    });
    // -------------------------
    let _object1;
    _object1 = { 
      name : variable,type : nPlot == 1 ? 'bar' : 'line',
      areaStyle: nPlot == 1 ? null : {color:'yellow'},
      smooth: false,
      symbol: 'none',data : _rslt1,duration: 100,
    }
    _SeriesData.push(_object1);
    _legendData.push(variable);
    // ------------
    return { legendData:_legendData ,categoryData, valueData:_SeriesData}
  }
  // ------------------
  const getChartTEMP = () => {
    // ----------------
    let _SeriesData:any = getDAYDataSeries();
    // ----------
    return ({
      title: { text: `TEMPERATURE RANGE` },
      tooltip: { trigger: "axis" },
      legend: { width: "83%", height: "17%", bottom: "91%", top: "10%", data: _SeriesData.legendData },
      xAxis: { type: 'time' },
      yAxis: { type: 'value' },		
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      toolbox: { show: true, feature: { dataZoom: { yAxisIndex: 'none' }, dataView: { readOnly: false }, 
                magicType: { type: ['line', 'bar'] }, restore: {}, saveAsImage: {} } },
      dataZoom: [
        { type: 'slider', xAxisIndex: 0, filterMode: 'none' },
        { type: 'slider', yAxisIndex: 0, filterMode: 'none' },
        { type: 'inside', xAxisIndex: 0, filterMode: 'none' },
        { type: 'inside', yAxisIndex: 0, filterMode: 'none' }
      ],
      series: _SeriesData.valueData
    })
  };
  const getChartRH = () => {
    // ----------------
    let _SeriesData:any = getHOURDataSeries(1);
    // ----------
    return ({
      title: { text: `RELATIVE HUMIDITY` },
      tooltip: { trigger: "axis" },
      legend: { width: "83%", height: "17%", bottom: "91%", top: "10%", data: _SeriesData.legendData },
      xAxis: { type: 'time' },
      yAxis: { type: 'value' },		
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      toolbox: { show: true, feature: { dataZoom: { yAxisIndex: 'none' }, dataView: { readOnly: false }, 
                magicType: { type: ['line', 'bar'] }, restore: {}, saveAsImage: {} } },
      dataZoom: [
        { type: 'slider', xAxisIndex: 0, filterMode: 'none' },
        { type: 'slider', yAxisIndex: 0, filterMode: 'none' },
        { type: 'inside', xAxisIndex: 0, filterMode: 'none' },
        { type: 'inside', yAxisIndex: 0, filterMode: 'none' }
      ],
      series: _SeriesData.valueData
    })
  };
  const getChartDIRAD = () => {
    // ----------------
    let _SeriesData:any = getHOURDataSeries(2);
    // ----------
    return ({
      title: { text: `DIRECT RADIATION` },
      tooltip: { trigger: "axis" },
      legend: { width: "83%", height: "17%", bottom: "91%", top: "10%", data: _SeriesData.legendData },
      xAxis: { type: 'time' },
      yAxis: { type: 'value' },		
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      toolbox: { show: true, feature: { dataZoom: { yAxisIndex: 'none' }, dataView: { readOnly: false }, 
                magicType: { type: ['line', 'bar'] }, restore: {}, saveAsImage: {} } },
      dataZoom: [
        { type: 'slider', xAxisIndex: 0, filterMode: 'none' },
        { type: 'slider', yAxisIndex: 0, filterMode: 'none' },
        { type: 'inside', xAxisIndex: 0, filterMode: 'none' },
        { type: 'inside', yAxisIndex: 0, filterMode: 'none' }
      ],
      series: _SeriesData.valueData
    })
  };
  // -----
  return (
    <div className='SembCorpPage'>
      <MDBContainer className="custom-container">
          <div className="row">
            SEMBCORP WEATHER PLOT
            <hr/>
            { getStatus() }
          </div>

            {  plotData && (loadingStatus === 'succeeded' || loadingStatus === 'failed' )&& weatherData?.daily && (
              <div className="row">
                <div className='echart'><ReactECharts option={getChartTEMP()} style={{margin:"auto",width:'100%',height:'300px',paddingBottom:'10px'}} /></div>
                <div className='echart'><ReactECharts option={getChartRH()} style={{margin:"auto",width:'100%',height:'300px',paddingBottom:'10px'}} /></div>
                <div className='echart'><ReactECharts option={getChartDIRAD()} style={{margin:"auto",width:'100%',height:'300px',paddingBottom:'10px'}} /></div>
              </div>)
            }

        </MDBContainer>
    </div>
  )
}

export default SembCorpPage