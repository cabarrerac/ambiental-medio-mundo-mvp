---
name: Eco-Logistics Modernity
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#3d4a42'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#6d7a72'
  outline-variant: '#bccac0'
  surface-tint: '#006c4a'
  primary: '#006948'
  on-primary: '#ffffff'
  primary-container: '#00855d'
  on-primary-container: '#f5fff7'
  inverse-primary: '#68dba9'
  secondary: '#3755c3'
  on-secondary: '#ffffff'
  secondary-container: '#708cfd'
  on-secondary-container: '#00217a'
  tertiary: '#545c72'
  on-tertiary: '#ffffff'
  tertiary-container: '#6c748b'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#85f8c4'
  primary-fixed-dim: '#68dba9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b8c4ff'
  on-secondary-fixed: '#001453'
  on-secondary-fixed-variant: '#173bab'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is engineered for **Ambiental Medio Mundo**, bridging the gap between high-stakes industrial waste logistics and cutting-edge environmental stewardship. The brand personality is **authoritative, precise, and restorative**. It must evoke the efficiency of a high-end logistics platform while maintaining the ethical weight of environmental responsibility.

The visual style is **Corporate / Modern** with a distinct **Eco-Tech** finish. It prioritizes clarity and data density to manage complex hazardous waste workflows. The interface utilizes generous whitespace to reduce cognitive load, balanced by rigorous grid structures that signify reliability and institutional trust. 

Targeting stakeholders in Bogota and beyond—from compliance officers to field technicians—the UI should feel like a premium tool that simplifies the messy reality of waste management into a clean, actionable digital ecosystem.

## Colors

The palette is anchored in **Forest Emerald (#059669)**, a primary green that is vibrant enough to feel modern but deep enough to remain serious and professional. This represents the ecological mission. 

**Corporate Blue (#1E40AF)** serves as the secondary color, used for interactive elements and trust-critical components to reinforce the SaaS/technical nature of the platform. 

The background architecture utilizes **Neutral Gray (#F3F4F6)** to create a soft, non-reflective workspace that prevents eye fatigue during long data-entry sessions. Semantic colors for status should follow hazardous waste conventions: **Amber (#D97706)** for caution/pending, **Rose (#E11D48)** for hazardous/critical, and the primary green for compliant/resolved.

## Typography

The design system utilizes **Inter** exclusively to ensure maximum readability and a systematic, utilitarian aesthetic. Inter’s tall x-height and neutral character make it ideal for the high-density data tables and logistics manifests inherent to waste management.

- **Headlines:** Use SemiBold (600) for structural hierarchy with slight negative letter spacing to maintain a compact, "engineered" look.
- **Body Text:** Standardized at 16px for desktop readability, scaling down to 14px for dense data grids.
- **Labels:** Use Medium (500) or SemiBold (600) weights to distinguish metadata from content. Captions and small labels should utilize a slight letter spacing increase for clarity at small sizes.

## Layout & Spacing

The layout follows a **12-column fluid grid** for the main content area, with a fixed sidebar for primary navigation. The spacing rhythm is built on an **8px base unit**, ensuring mathematical harmony across all components.

- **Desktop:** 32px outer margins with 24px gutters. Use a "Stacked Card" approach for dashboards, where related data groups are encapsulated in containers.
- **Mobile:** The grid collapses to a single column with 16px margins. Complex data tables should utilize horizontal scrolling with "sticky" ID columns to maintain context.
- **Density:** The design system supports a "Comfortable" density for general settings and a "Compact" density (using 4px increments) for logistics manifests and manifest tracking tables.

## Elevation & Depth

To maintain a clean, Shadcn-inspired aesthetic, the design system utilizes **Tonal Layers** combined with **Ambient Shadows**. Depth is used sparingly to signify interactivity and importance.

- **Surface Level (0):** The neutral background (#F3F4F6).
- **Component Level (1):** Cards and containers use white backgrounds with a subtle 1px border (#E5E7EB) and a very soft, diffused shadow (0px 1px 3px rgba(0,0,0,0.05)).
- **Overlay Level (2):** Modals and dropdowns use a more pronounced shadow (0px 10px 15px -3px rgba(0,0,0,0.1)) to pull the element forward.
- **Interaction:** Hover states on interactive cards should see a slight elevation increase (Y-offset 4px) or a subtle border color shift to the primary green to indicate clickability.

## Shapes

The shape language is defined by **rounded-2xl (16px)** corners for primary containers and cards, creating a friendly and modern "tech" feel that softens the industrial subject matter. 

- **Primary Buttons & Inputs:** Follow the `rounded-lg` (8px) standard for a precise, professional look.
- **Status Badges & Chips:** Utilize pill-shaped (full rounded) geometry to distinguish them from interactive buttons.
- **Data Points:** Small UI elements like checkboxes use a smaller radius (4px) to maintain a crisp appearance even at small scales.

## Components

- **Buttons:** Primary buttons use a solid Forest Emerald fill with white text. Ghost buttons use the Corporate Blue for secondary actions to maintain trust signals without competing for attention.
- **Input Fields:** Use a white background with a subtle border. The "Focus" state should feature a 2px ring of the primary green. Labels should be positioned directly above the field in `label-sm`.
- **Status Chips:** High-contrast background tints with darker text. For example, a "Hazardous" chip uses a light rose background with deep red text.
- **Data Tables:** Clean, borderless rows with subtle horizontal dividers. Header rows should have a slightly darker gray background (#F9FAFB) and use `label-md` for column titles.
- **Cards:** White containers with `rounded-2xl` corners. Use for grouping waste metrics, upcoming pickups, and compliance alerts.
- **Icons:** Use thin-stroke (2px) monochromatic icons (Lucide style). Icons should be functional—acting as visual shorthand for waste types (e.g., biohazard, chemical, paper).
- **Logistics Timeline:** A specialized vertical stepper component to track the journey of waste from collection to final disposal, using the primary green to indicate completed stages.