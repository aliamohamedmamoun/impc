import React from 'react';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Intro() {
  return (
    <Container fluid className="mb-4">
      <Row>
        <h1 className="mb-4">Introduction to IMPC Embryo Data</h1>
      </Row>
      <Row>
        <p>
          Up to one third of homozygous knockout lines are lethal, which means
          no homozygous mice or less than expected are observed past the weaning
          stage (IMPC{' '}
          <a href="https://www.mousephenotype.org/impress/ProcedureInfo?action=list&procID=703&pipeID=7">
            Viability Primary Screen procedure
          </a>
          ) . Early death may occur during embryonic development or soon after
          birth, during the pre-weaning stage. For this reason, the IMPC
          established a{' '}
          <a href="https://www.mousephenotype.org/impress">
            systematic embryonic phenotyping pipeline
          </a>{' '}
          to morphologically evaluate mutant embryos to ascertain the primary
          perturbations that cause early death and thus gain insight into gene
          function.
        </p>
        <p>
          As determined in IMPReSS (see interactive diagram{' '}
          <a href="https://www.mousephenotype.org/impress">here</a>), all
          embryonic lethal lines undergo gross morphology assessment at E12.5
          (embryonic day 12.5) to determine whether defects occur earlier or
          later during embryonic development. A comprehensive imaging platform
          is then used to assess dysmorphology. Embryo gross morphology, as well
          as 2D and 3D imaging are actively being implemented by the IMPC for
          lethal lines.
        </p>
        <p>
          Read more in our paper on{' '}
          <a href="https://europepmc.org/article/PMC/5295821">
            High-throughput discovery of novel developmental phenotypes, Nature
            2016.
          </a>
        </p>
      </Row>
      <Row xs={1} sm={1} md={3}>
        <Col className="position-relative" style={{ height: '270px' }}>
          <Image
            src="/embryo_image_1.jpeg"
            alt="embryo sample 1"
            fill
            sizes="(max-width: 768px) 300px,
                    (max-width: 1200px) calc(100% / 3),
                    calc(100% / 3)"
          />
        </Col>
        <Col className="position-relative " style={{ height: '270px' }}>
          <Image
            src="/embryo_image_2.jpg"
            alt="embryo sample 2"
            fill
            sizes="(max-width: 768px) 300px,
                    (max-width: 1200px) calc(100% / 3),
                    calc(100% / 3)"
          />
        </Col>
        <Col className="position-relative" style={{ height: '270px' }}>
          <Image
            src="/embryo_image_3.jpeg"
            alt="embryo sample 3"
            fill
            sizes="(max-width: 768px) 300px,
                    (max-width: 1200px) calc(100% / 3),
                    calc(100%/3)"
          />
        </Col>
      </Row>
    </Container>
  );
}
