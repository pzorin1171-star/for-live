import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import type { MortgageInput, PaymentType } from '@/types/mortgage';

interface CalculatorFormProps {
  onCalculate: (data: MortgageInput) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<MortgageInput>({
    defaultValues: {
      price: 5000000,
      initialPayment: 1000000,
      term: 15,
      rate: 10,
      paymentType: 'annuity',
    },
  });

  const paymentType = watch('paymentType');

  // Вспомогательная функция для переключения типа платежа
  const setPaymentType = (type: PaymentType) => {
    setValue('paymentType', type);
  };

  return (
    <form onSubmit={handleSubmit(onCalculate)} className="space-y-4">
      <Input
        label="Стоимость недвижимости (руб)"
        type="number"
        {...register('price', { required: 'Обязательное поле', min: 1 })}
        error={errors.price?.message}
      />

      <Input
        label="Первоначальный взнос (руб)"
        type="number"
        {...register('initialPayment', { required: 'Обязательное поле', min: 0 })}
        error={errors.initialPayment?.message}
      />

      <Input
        label="Срок кредита (лет)"
        type="number"
        {...register('term', { required: 'Обязательное поле', min: 1, max: 30 })}
        error={errors.term?.message}
      />

      <Input
        label="Процентная ставка (% годовых)"
        type="number"
        step="0.1"
        {...register('rate', { required: 'Обязательное поле', min: 0.1 })}
        error={errors.rate?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Тип платежа</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="annuity"
              checked={paymentType === 'annuity'}
              onChange={() => setPaymentType('annuity')}
              className="mr-2"
            />
            Аннуитетный
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="differentiated"
              checked={paymentType === 'differentiated'}
              onChange={() => setPaymentType('differentiated')}
              className="mr-2"
            />
            Дифференцированный
          </label>
        </div>
      </div>

      <Button type="submit" variant="primary">Рассчитать</Button>
    </form>
  );
};

export default CalculatorForm;
