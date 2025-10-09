"use client"

import type React from "react"
import type { ReactNode } from "react"
import styles from "./TestCardTwo.module.css"

interface TestCardTwoProps {
  title: string
  description: string
  imageSrc?: string
  className?: string
  icon?: ReactNode
  url?: string
  link?: string
  onClick?: (e: any) => void
  pressable?: boolean
  readmore?: boolean
}

const TestCardTwo: React.FC<TestCardTwoProps> = ({
  title,
  description,
  imageSrc,
  className = "",
  icon,
  url,
  link,
  onClick,
  pressable = false,
  readmore = true,
}) => {
  const isInteractive = !!onClick || !!link
  const Component = isInteractive ? "button" : "div"

  return (
    <Component
      onClick={onClick}
      className={`${styles.card} ${isInteractive ? styles.interactive : ""} ${className}`}
      {...(isInteractive && Component === "button"
        ? {
            type: "button",
            "aria-label": `${title} - ${description}`,
          }
        : {})}
    >
      {/* Image Section */}
      {imageSrc && (
        <div className={styles.imageContainer}>
          <img src={imageSrc || "/placeholder.svg"} alt={title} className={styles.image} loading="lazy" />
        </div>
      )}

      {/* Icon Section */}
      {icon && (
        <div className={styles.iconWrapper}>
          <div className={styles.iconContainer} aria-hidden="true">
            {icon}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className={styles.content}>
        {/* Title with accent underline */}
        <h3 className={styles.title}>
          {title}
          <span className={styles.titleAccent} aria-hidden="true" />
        </h3>

        {/* Description */}
        <p className={styles.description}>{description}</p>

        {/* Optional Read More Section */}
        {readmore && (onClick || link) && (
          <div className={styles.readMoreWrapper}>
            {onClick ? (
              <span className={styles.readMore}>
                Read More
                <svg className={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            ) : link ? (
              <a href={link} className={styles.readMoreLink} onClick={(e) => e.stopPropagation()}>
                Read More
                <svg className={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ) : null}
          </div>
        )}
      </div>
    </Component>
  )
}

export default TestCardTwo
