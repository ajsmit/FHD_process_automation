import { Button } from '@/components/ui/button';

export interface ReviewActionStep {
  approveLabel: string;
  returnLabel: string;
  enabledWhen: string;
  onApprove: () => void;
  onReturn: () => void;
}

interface ReviewActionButtonsProps {
  currentStatus: string | null | undefined;
  steps: ReviewActionStep[];
}

export function ReviewActionButtons({ currentStatus, steps }: ReviewActionButtonsProps) {
  return (
    <>
      {steps.map((step) => {
        const enabled = currentStatus === step.enabledWhen;
        return (
          <span key={`${step.approveLabel}:${step.enabledWhen}`} className='contents'>
            <Button onClick={step.onApprove} disabled={!enabled}>
              {step.approveLabel}
            </Button>
            <Button onClick={step.onReturn} disabled={!enabled}>
              {step.returnLabel}
            </Button>
          </span>
        );
      })}
    </>
  );
}
