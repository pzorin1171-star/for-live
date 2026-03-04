import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import type { Template, TemplateField } from '@/types/template';

interface TemplateFormProps {
  template: Template;
}

interface FormData {
  [key: string]: string;
}

const TemplateForm: React.FC<TemplateFormProps> = ({ template }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Здесь можно отправить данные на API для генерации документа
    // или использовать клиентскую генерацию.
    // Для простоты показываем alert с собранными данными.
    console.log(data);
    alert('Функция генерации документа находится в разработке. Собранные данные: ' + JSON.stringify(data));
  };

  // Функция для генерации поля формы на основе описания
  const renderField = (field: TemplateField) => {
    const commonProps = {
      label: field.label,
      ...register(field.name, { required: `${field.label} обязательно` }),
      error: errors[field.name]?.message as string,
    };

    if (field.type === 'textarea') {
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
            {...register(field.name, { required: `${field.label} обязательно` })}
          />
          {errors[field.name] && <p className="text-red-600 text-sm mt-1">{errors[field.name]?.message}</p>}
        </div>
      );
    }

    return <Input key={field.name} type={field.type} {...commonProps} />;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {template.fields?.map(renderField)}

      <div className="mt-6">
        <Button type="submit" variant="primary">Сгенерировать документ</Button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        После нажатия будет сгенерирован документ с заполненными данными для скачивания.
      </p>
    </form>
  );
};

export default TemplateForm;
