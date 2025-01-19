export interface IBaseTemplateProps {
  sampleTextProp: string;
}

const BaseTemplate: React.FC<IBaseTemplateProps> = ({ sampleTextProp }) => {
  return <div>{sampleTextProp}</div>;
};

export default BaseTemplate;
