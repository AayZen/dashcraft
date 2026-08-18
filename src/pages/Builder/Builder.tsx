import React from "react";
import { useParams } from "react-router-dom";
import { BuilderShell } from "../../components/builder/BuilderShell";
import { SEO } from "../../components/common/SEO";
import { builderSEO } from "../../data/seoData";

const Builder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <SEO {...builderSEO} />
      <BuilderShell dashboardId={id} />
    </>
  );
};

export default Builder;
