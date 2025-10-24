import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";

const breadcrumbItems = [
  {
    label: "Test_Account Owner - CT Enterprise Test Account",
    href: "javascript:void(0);",
  },
  {
    label: "TimmyUpdatedbyAngelAPI Timtim2 - ClientTether Arizona",
    href: "javascript:void(0);",
  },
];

export const BreadcrumbsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full h-[60px] px-0 py-2 bg-white">
      <div className="flex items-center gap-2 mb-1">
        <ArrowLeftIcon className="w-6 h-6" />
        <div className="flex flex-col">
          <p className="font-[number:var(--alert-title-font-weight)] tracking-[var(--alert-title-letter-spacing)] leading-[var(--alert-title-line-height)] font-alert-title text-[#000000de] text-[length:var(--alert-title-font-size)] [font-style:var(--alert-title-font-style)]">
            Click on an account name below to return to that account.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center w-full bg-white">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={item.href}
                    className="font-normal leading-4 [font-family:'Figtree',Helvetica] text-[#000000de] text-base tracking-[0.02px] leading-6 underline"
                  >
                    {item.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && (
                  <BreadcrumbSeparator className="font-typography-body1 font-[number:var(--typography-body1-font-weight)] text-[#00000099] text-[length:var(--typography-body1-font-size)] tracking-[var(--typography-body1-letter-spacing)] leading-[var(--typography-body1-line-height)] [font-style:var(--typography-body1-font-style)]">
                    /
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  );
};
