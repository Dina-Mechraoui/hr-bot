import { createPricingPlan } from '@/api/admin';
import toast from 'react-hot-toast';
import { TOAST_DURATION } from '@/config/toast';
import { useCallback } from 'react';

export function usePricingFormSubmit() {
  const handleSubmit = useCallback(async (formValues) => {
    try {
      await createPricingPlan({
        ...formValues,
        monthly_job_offers: Number(formValues.monthly_job_offers || 0),
        custom_questions: Number(formValues.custom_questions || 0),
        questions_per_interview: Number(formValues.questions_per_interview || 0),
        is_active: formValues.is_active === 'true' || formValues.is_active === true,
      });

      toast.success('Pricing plan submitted successfully!', {
        duration: TOAST_DURATION.MEDIUM,
      });
        window.location.reload();
    } catch (err) {
      toast.error('Failed to submit pricing plan');
    }
  }, []);

  return handleSubmit;
}
