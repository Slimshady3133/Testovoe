import React, { useState } from 'react';

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState(model.paramValues);

  const handleParamValueChange = (paramId: number, value: string) => {
    setParamValues((prevValues) =>
      prevValues.map((paramValue) =>
        paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
      )
    );
  };

  return (
    <>
      {params.map((param) => (
        <div key={param.id}>
          <label htmlFor={`param-${param.id}`}>{param.name}</label>
          <input
            id={`param-${param.id}`}
            type="text"
            value={
              paramValues.find((pv) => pv.paramId === param.id)?.value ?? ''
            }
            onChange={(e) => handleParamValueChange(param.id, e.target.value)}
          />
        </div>
      ))}
    </>
  );
};

export default ParamEditor;
