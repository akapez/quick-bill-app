export interface IBaseTemplateProps {
  sampleTextProp: string;
}

export default function BaseTemplate({ sampleTextProp }: IBaseTemplateProps) {
  return <div>{sampleTextProp}</div>;
}
