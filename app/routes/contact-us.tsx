import { useForm } from "@conform-to/react/future";
import { coerceFormValue } from "@conform-to/zod/v4/future";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Form, useNavigation } from "react-router";
import { z } from "zod";

import type { Route } from "./+types/contact-us";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/ui/spinner";
import { Textarea } from "~/components/ui/textarea";
import { getInstance } from "~/features/localization/i18next-middleware.server";
import { cn } from "~/lib/utils";
import { sendEmail } from "~/utils/email.server";
import { validateFormData } from "~/utils/validate-form-data.server";

z.config({ jitless: true });

const CONTACT_US_INTENT = "contact-us";

const contactUsSchema = z.object({
  email: z
    .email({ message: "stealthMode:contactUs.validation.emailInvalid" })
    .trim()
    .min(1, { message: "stealthMode:contactUs.validation.emailRequired" }),
  intent: z.literal(CONTACT_US_INTENT),
  message: z
    .string()
    .trim()
    .min(1, { message: "stealthMode:contactUs.validation.messageRequired" })
    .max(5000, { message: "stealthMode:contactUs.validation.messageTooLong" }),
  name: z
    .string()
    .trim()
    .min(1, { message: "stealthMode:contactUs.validation.nameRequired" })
    .max(255, { message: "stealthMode:contactUs.validation.nameTooLong" }),
  phone: z.string().trim().optional(),
});

export function loader({ context }: Route.LoaderArgs) {
  const i18n = getInstance(context);
  return { pageTitle: i18n.t("stealthMode:contactUs.pageTitle") };
}

export const meta: Route.MetaFunction = ({ loaderData }) => [
  { title: loaderData?.pageTitle },
];

export async function action({ request }: Route.ActionArgs) {
  const result = await validateFormData(
    request,
    coerceFormValue(contactUsSchema),
  );

  if (!result.success) {
    return result.response;
  }

  const { name, email, phone, message } = result.data;

  await sendEmail({
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone ?? "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    subject: `[Ara OS] Contact form submission from ${name}`,
    text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone ?? "Not provided"}\n\nMessage:\n${message}`,
    to: "ppr.bilal@gmail.com",
  });

  return { result: undefined, success: true };
}

export default function ContactUsRoute({ actionData }: Route.ComponentProps) {
  const { t } = useTranslation("stealthMode", { keyPrefix: "contactUs" });
  const lastResult = actionData?.result;
  const success =
    actionData && "success" in actionData ? actionData.success : false;

  const { form, fields } = useForm({
    lastResult,
    schema: coerceFormValue(contactUsSchema),
  });
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" &&
    navigation.formData?.get("intent") === CONTACT_US_INTENT;

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden p-4">
      {/* Radial spotlight */}
      <div
        aria-hidden="true"
        className={cn(
          "-top-1/2 -translate-x-1/2 pointer-events-none absolute left-1/2 h-[120vmin] w-[120vmin] rounded-full",
          "bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]",
          "blur-[30px]",
        )}
      />

      <div className="relative w-full max-w-md bg-background p-4">
        <div className="-left-px -inset-y-6 absolute w-px bg-border" />
        <div className="-right-px -inset-y-6 absolute w-px bg-border" />
        <div className="-top-px -inset-x-6 absolute h-px bg-border" />
        <div className="-bottom-px -inset-x-6 absolute h-px bg-border" />
        <PlusIcon
          aria-hidden="true"
          className="-left-[12.5px] -top-[12.5px] absolute size-6 text-muted-foreground"
          strokeWidth={0.5}
        />
        <PlusIcon
          aria-hidden="true"
          className="-right-[12.5px] -bottom-[12.5px] absolute size-6 text-muted-foreground"
          strokeWidth={0.5}
        />

        <div className="rounded-md border border-border/60 p-[2px]">
          <div className="items-left flex flex-col justify-center gap-1 rounded-md border bg-card p-4 shadow-xs">
            <h1 className="font-medium text-xl">{t("title")}</h1>
            <p className="text-muted-foreground text-sm">
              {success ? t("success.title") : t("description")}
            </p>
          </div>
        </div>

        {success ? (
          <div className="p-4 text-center">
            <p className="text-muted-foreground text-sm">
              {t("success.description")}
            </p>
          </div>
        ) : (
          <Form method="POST" {...form.props}>
            <FieldSet disabled={isSubmitting}>
              <FieldGroup className="p-4">
                <Field data-invalid={fields.name.ariaInvalid}>
                  <FieldLabel htmlFor={fields.name.id}>
                    {t("fields.name.label")}
                  </FieldLabel>
                  <Input
                    {...fields.name.inputProps}
                    autoComplete="name"
                    placeholder={t("fields.name.placeholder")}
                  />
                  <FieldError
                    errors={fields.name.errors}
                    id={fields.name.errorId}
                  />
                </Field>

                <Field data-invalid={fields.email.ariaInvalid}>
                  <FieldLabel htmlFor={fields.email.id}>
                    {t("fields.email.label")}
                  </FieldLabel>
                  <Input
                    {...fields.email.inputProps}
                    autoComplete="email"
                    placeholder={t("fields.email.placeholder")}
                    type="email"
                  />
                  <FieldError
                    errors={fields.email.errors}
                    id={fields.email.errorId}
                  />
                </Field>

                <Field data-invalid={fields.phone.ariaInvalid}>
                  <FieldLabel htmlFor={fields.phone.id}>
                    {t("fields.phone.label")}
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      {t("fields.phone.optional")}
                    </span>
                  </FieldLabel>
                  <Input
                    {...fields.phone.inputProps}
                    autoComplete="tel"
                    placeholder={t("fields.phone.placeholder")}
                    type="tel"
                  />
                  <FieldDescription>
                    {t("fields.phone.description")}
                  </FieldDescription>
                  <FieldError
                    errors={fields.phone.errors}
                    id={fields.phone.errorId}
                  />
                </Field>

                <Field data-invalid={fields.message.ariaInvalid}>
                  <FieldLabel htmlFor={fields.message.id}>
                    {t("fields.message.label")}
                  </FieldLabel>
                  <Textarea
                    {...fields.message.inputProps}
                    className="field-sizing-fixed!"
                    placeholder={t("fields.message.placeholder")}
                    rows={4}
                  />
                  <FieldError
                    errors={fields.message.errors}
                    id={fields.message.errorId}
                  />
                </Field>
              </FieldGroup>

              <div className="p-2">
                <Button
                  className="w-full"
                  name="intent"
                  type="submit"
                  value={CONTACT_US_INTENT}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner /> {t("submitting")}
                    </>
                  ) : (
                    t("submitButton")
                  )}
                </Button>
              </div>
            </FieldSet>
          </Form>
        )}
      </div>
    </div>
  );
}
