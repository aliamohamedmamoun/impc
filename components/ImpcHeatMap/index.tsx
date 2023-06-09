import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputRange from '../InputRange';

import type { Data, HeatMapData } from '../../constants/types';
import { NUMBER_OF_ITEMS_PER_PAGE } from '../../constants';
import {
  mapDataToHeatMapData,
  mapToMostSignificantPhenotypeHeatMap,
} from '../../utils';

const AutoComplete = dynamic(() => import('../AutoComplete'), { ssr: false });
const HeatMap = dynamic(() => import('../HeatMap'), { ssr: false });

interface IHeatMap {
  data: Data[];
}

// TODO: Refactor to inhance performance by using
// IndexedDB for saving data,filtering and pagination
export default function ImpcHeatMap({ data }: IHeatMap) {
  const originalHeatMapData = mapDataToHeatMapData(data);
  const sortedOriginalData = [...originalHeatMapData].sort(
    (a: HeatMapData, b: HeatMapData) =>
      b.data.reduce((acc, c) => acc + (c.y || 0), 0) -
      a.data.reduce((acc, c) => acc + (c.y || 0), 0)
  );
  // to keep track of newly updated data instead of updating the state with large amount of data
  const newData = useRef<HeatMapData[]>([]);

  const originalHeatMapDataLength = originalHeatMapData.length;

  const [geneSelections, setGeneSelections] = useState<string[] | Object[]>([]);
  const [topPhenoTypeSelections, setTopPhenoTypeSelections] = useState<
    string[] | Object[]
  >([]);
  const [rangeGeneCount, setRangeGeneCount] = useState(0);
  const [heatMapData, setHeatMapData] = useState(
    originalHeatMapData.slice(0, NUMBER_OF_ITEMS_PER_PAGE)
  );
  const [activePage, setActivePage] = useState(0);
  const [numberOfPages, setNumOfPages] = useState(
    Math.ceil(originalHeatMapDataLength / NUMBER_OF_ITEMS_PER_PAGE)
  );

  const isFilterApplied =
    rangeGeneCount > 0 ||
    topPhenoTypeSelections.length > 0 ||
    geneSelections.length > 0;
  let paginationItems = [];

  // handle sliding.slicing window on newData
  useEffect(() => {
    if (activePage >= 1) {
      const startingIndex = (activePage - 1) * NUMBER_OF_ITEMS_PER_PAGE;
      const endingIndex =
        (activePage - 1) * NUMBER_OF_ITEMS_PER_PAGE + NUMBER_OF_ITEMS_PER_PAGE;
      if (!isFilterApplied) {
        newData.current = originalHeatMapData.slice(
          startingIndex,
          endingIndex > originalHeatMapDataLength
            ? originalHeatMapDataLength
            : endingIndex
        );
        setHeatMapData(newData.current);
      } else {
        setHeatMapData(
          newData.current.slice(
            startingIndex,
            endingIndex > newData.current.length
              ? newData.current.length
              : endingIndex
          )
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  for (let number = 1; number <= numberOfPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={
          number === 1
            ? number === activePage || activePage === 0
            : number === activePage
        }
        onClick={() => setActivePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // TODO: Refactor and create pagination component
  const resetPagination = (newSize: number) => {
    setNumOfPages(Math.ceil(newSize / NUMBER_OF_ITEMS_PER_PAGE));
    if (activePage > 1) {
      setActivePage(0);
    }
  };

  const handleGeneSelectionChange = (selected: string[] | Object[]) => {
    setGeneSelections(selected);

    if (selected.length === 0) {
      setHeatMapData(originalHeatMapData.slice(0, NUMBER_OF_ITEMS_PER_PAGE));
      resetPagination(originalHeatMapDataLength);
    } else {
      newData.current = [];
      const selectedOptions = selected as HeatMapData[];

      for (let i of selectedOptions) {
        newData.current.push(
          ...originalHeatMapData.filter((item) => item.id === i.id)
        );
      }
      resetPagination(newData.current.length);
      setHeatMapData(newData.current.slice(0, NUMBER_OF_ITEMS_PER_PAGE));
    }
    //clear other filters
    if (topPhenoTypeSelections.length) {
      setTopPhenoTypeSelections([]);
    }
    if (rangeGeneCount > 0) {
      setRangeGeneCount(0);
    }
  };

  const handleTopPhenoTypeSelectionChange = (selected: string[] | Object[]) => {
    setTopPhenoTypeSelections(selected);

    if (selected.length === 0) {
      setHeatMapData(originalHeatMapData.slice(0, NUMBER_OF_ITEMS_PER_PAGE));
      resetPagination(originalHeatMapDataLength);
    } else {
      newData.current = [];
      const selectedOptions = selected as HeatMapData[];

      newData.current = originalHeatMapData.filter((item) =>
        selectedOptions.every((option) =>
          item.data.some((i) => i.x === option.id)
        )
      );
      resetPagination(newData.current.length);
      setHeatMapData(newData.current.slice(0, NUMBER_OF_ITEMS_PER_PAGE));
    }
    //clear other filters
    if (geneSelections.length) {
      setGeneSelections([]);
    }
    if (rangeGeneCount > 0) {
      setRangeGeneCount(0);
    }
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setRangeGeneCount(newValue);
    if (newValue > 0) {
      const dataLength = originalHeatMapDataLength;
      const newPercentile = Math.floor(
        ((newValue + 10) / 100) * originalHeatMapDataLength
      );
      newData.current = sortedOriginalData.slice(
        0,
        newPercentile > dataLength ? dataLength : newPercentile
      );
      resetPagination(newData.current.length);
      setHeatMapData(newData.current.slice(0, NUMBER_OF_ITEMS_PER_PAGE));
    } else {
      setHeatMapData(originalHeatMapData.slice(0, NUMBER_OF_ITEMS_PER_PAGE));
      resetPagination(originalHeatMapDataLength);
    }

    //clear other filters
    if (geneSelections.length) {
      setGeneSelections([]);
    }
    if (topPhenoTypeSelections.length) {
      setTopPhenoTypeSelections([]);
    }
  };

  return (
    <Container fluid>
      <Row>
        <h1 className="mb-0 mt-4 text-decoration-underline">
          Embryo Phenotype Data HeatMap
        </h1>
      </Row>
      <Row className="mb-4 mt-4" xs={1} sm={1} md={2}>
        <Col>
          <AutoComplete
            options={originalHeatMapData}
            selections={geneSelections}
            multiple
            handleChange={handleGeneSelectionChange}
            labelText="Filter by gene list"
            placeHolder="Choose a list of genes..."
            optionsLabelKey="id"
            id="geneSelections"
          />
        </Col>
        <Col>
          <AutoComplete
            options={mapToMostSignificantPhenotypeHeatMap(data)}
            selections={topPhenoTypeSelections}
            multiple
            handleChange={handleTopPhenoTypeSelectionChange}
            labelText="Filter by significant phenotype system"
            placeHolder="Choose a list of significant phenotypes"
            optionsLabelKey="id"
            id="topPhenoTypeSelections"
          />
        </Col>
      </Row>
      <Row className="w-50 mb-4">
        <Col>
          <InputRange
            labelText={`Filter top %${
              rangeGeneCount || '10'
            } of the genes that have the highest phenotype count`}
            id="range-filter"
            value={rangeGeneCount}
            handleChange={handleRangeChange}
          />
        </Col>
      </Row>
      <Row
        className="mt-4 vw-100 vh-100"
        style={{
          maxWidth: '1170px',
        }}
      >
        <HeatMap
          heatMapData={heatMapData}
          minValue={1}
          maxValue={originalHeatMapData[
            originalHeatMapDataLength - 1
          ].data.reduce((acc, c) => acc + (c.y || 0), 0)}
        />
      </Row>
      <Row>
        {numberOfPages > 1 && <Pagination>{paginationItems}</Pagination>}
      </Row>
    </Container>
  );
}
