
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDynamicForm } from '@/hooks/useDynamicForm';
import { Loader2 } from 'lucide-react';

interface DynamicValidatedFormProps {
  componentName: string;
  title: string;
  fields: Array<{
    name: string;
    label: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel';
    placeholder?: string;
  }>;
  onSubmit: (data: any) => Promise<void> | void;
  defaultValues?: Record<string, any>;
  submitLabel?: string;
}

const DynamicValidatedForm: React.FC<DynamicValidatedFormProps> = ({
  componentName,
  title,
  fields,
  onSubmit,
  defaultValues = {},
  submitLabel = 'Submit'
}) => {
  const {
    values,
    errors,
    isSubmitting,
    isLoading,
    setValue,
    handleSubmit
  } = useDynamicForm({
    componentName,
    onSubmit,
    defaultValues
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading validation rules...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.form && (
            <Alert variant="destructive">
              <AlertDescription>{errors.form}</AlertDescription>
            </Alert>
          )}

          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type || 'text'}
                placeholder={field.placeholder}
                value={values[field.name] || ''}
                onChange={(e) => setValue(field.name, e.target.value)}
                className={errors[field.name] ? 'border-red-500' : ''}
              />
              {errors[field.name] && (
                <p className="text-sm text-red-500">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DynamicValidatedForm;
