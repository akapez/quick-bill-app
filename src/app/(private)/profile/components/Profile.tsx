'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { updateProfile } from '@actions/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileSchema, profileSchema } from '@lib/zod-schema/profile.schema';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/Form';
import { Input } from '@components/ui/Input';

interface ProfileProps {
  userId: string;
}

export default function Profile({ userId }: ProfileProps) {
  const router = useRouter();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      image: undefined,
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<ProfileSchema> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.image) {
      formData.append('image', data.image);
    }
    startTransition(() => {
      updateProfile(formData, userId).then((data) => {
        if (data.success) {
          toast.success('Profile updated!');
          update({ name: data.success.name, image: data.success.image });
          router.push('/dashboard');
        } else {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <div className="max-w-6xl lg:max-w-xl">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="image">Upload Image</FormLabel>
                  <FormControl>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isPending}
            id="update-profile-btn"
            className="w-full md:w-40"
            type="submit"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              'Update'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
