import React from "react";
import "./QrCodeScannerDescription.css";

const QrCodeScannerDescription: React.FC = () => {
  return (
    <div className="qrscanner-desc-container">
      <div className="qrscanner-desc-header">
        <h2 className="qrscanner-desc-title">QR Code Scanner</h2>
        <p className="qrscanner-desc-subtitle">
          Instant QR code scanning and generation - fast, secure, and works
          entirely in your browser
        </p>
      </div>

      <div className="qrscanner-desc-content">
        <section className="qrscanner-desc-section">
          <h3 className="qrscanner-desc-section-title">Core Features</h3>
          <div className="qrscanner-desc-features-grid">
            <div className="qrscanner-desc-feature-card">
              <div className="qrscanner-desc-feature-icon">📷</div>
              <h4 className="qrscanner-desc-feature-title">
                Real-Time Camera Scanning
              </h4>
              <p className="qrscanner-desc-feature-text">
                Use your device's camera to scan QR codes instantly. Our
                advanced detection algorithm works in various lighting
                conditions and angles for reliable scanning.
              </p>
            </div>

            <div className="qrscanner-desc-feature-card">
              <div className="qrscanner-desc-feature-icon">🖼️</div>
              <h4 className="qrscanner-desc-feature-title">
                Image Upload Support
              </h4>
              <p className="qrscanner-desc-feature-text">
                Already have a QR code image? Simply upload it from your device
                and decode it instantly. Supports JPG, PNG, and other common
                image formats.
              </p>
            </div>

            <div className="qrscanner-desc-feature-card">
              <div className="qrscanner-desc-feature-icon">✨</div>
              <h4 className="qrscanner-desc-feature-title">
                QR Code Generation
              </h4>
              <p className="qrscanner-desc-feature-text">
                Create custom QR codes for URLs, text, contact information, WiFi
                credentials, and more. Customize size, error correction level,
                and download in multiple formats.
              </p>
            </div>

            <div className="qrscanner-desc-feature-card">
              <div className="qrscanner-desc-feature-icon">🔒</div>
              <h4 className="qrscanner-desc-feature-title">Privacy First</h4>
              <p className="qrscanner-desc-feature-text">
                All scanning and generation happens locally in your browser. No
                data is sent to external servers, ensuring your information
                stays completely private and secure.
              </p>
            </div>

            <div className="qrscanner-desc-feature-card">
              <div className="qrscanner-desc-feature-icon">⚡</div>
              <h4 className="qrscanner-desc-feature-title">Lightning Fast</h4>
              <p className="qrscanner-desc-feature-text">
                Optimized algorithms provide instant scanning and generation. No
                waiting, no loading screens - just point, scan, and get results
                immediately.
              </p>
            </div>

            <div className="qrscanner-desc-feature-card">
              <div className="qrscanner-desc-feature-icon">📱</div>
              <h4 className="qrscanner-desc-feature-title">
                Multi-Device Support
              </h4>
              <p className="qrscanner-desc-feature-text">
                Works seamlessly across desktop, tablet, and mobile devices.
                Responsive design ensures optimal experience regardless of
                screen size or device type.
              </p>
            </div>
          </div>
        </section>

        <section className="qrscanner-desc-section">
          <h3 className="qrscanner-desc-section-title">What Can You Scan?</h3>
          <div className="qrscanner-desc-use-cases">
            <div className="qrscanner-desc-use-case">
              <div className="qrscanner-desc-use-case-icon">🌐</div>
              <div className="qrscanner-desc-use-case-content">
                <h4 className="qrscanner-desc-use-case-title">Website URLs</h4>
                <p className="qrscanner-desc-use-case-text">
                  Open websites instantly by scanning QR codes on products,
                  posters, business cards, or advertisements.
                </p>
              </div>
            </div>

            <div className="qrscanner-desc-use-case">
              <div className="qrscanner-desc-use-case-icon">📞</div>
              <div className="qrscanner-desc-use-case-content">
                <h4 className="qrscanner-desc-use-case-title">
                  Contact Information
                </h4>
                <p className="qrscanner-desc-use-case-text">
                  Scan vCards to instantly save phone numbers, emails, and
                  addresses to your contacts without manual entry.
                </p>
              </div>
            </div>

            <div className="qrscanner-desc-use-case">
              <div className="qrscanner-desc-use-case-icon">📶</div>
              <div className="qrscanner-desc-use-case-content">
                <h4 className="qrscanner-desc-use-case-title">WiFi Networks</h4>
                <p className="qrscanner-desc-use-case-text">
                  Connect to WiFi networks effortlessly by scanning QR codes. No
                  need to type long passwords manually.
                </p>
              </div>
            </div>

            <div className="qrscanner-desc-use-case">
              <div className="qrscanner-desc-use-case-icon">💳</div>
              <div className="qrscanner-desc-use-case-content">
                <h4 className="qrscanner-desc-use-case-title">Payment Links</h4>
                <p className="qrscanner-desc-use-case-text">
                  Scan payment QR codes for quick and secure transactions
                  through various payment platforms and cryptocurrency wallets.
                </p>
              </div>
            </div>

            <div className="qrscanner-desc-use-case">
              <div className="qrscanner-desc-use-case-icon">📄</div>
              <div className="qrscanner-desc-use-case-content">
                <h4 className="qrscanner-desc-use-case-title">
                  Plain Text & Messages
                </h4>
                <p className="qrscanner-desc-use-case-text">
                  Decode text messages, notes, and information encoded in QR
                  codes for easy sharing and reading.
                </p>
              </div>
            </div>

            <div className="qrscanner-desc-use-case">
              <div className="qrscanner-desc-use-case-icon">🎫</div>
              <div className="qrscanner-desc-use-case-content">
                <h4 className="qrscanner-desc-use-case-title">
                  Event Tickets & Passes
                </h4>
                <p className="qrscanner-desc-use-case-text">
                  Verify and access event tickets, boarding passes, and digital
                  coupons by scanning their QR codes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="qrscanner-desc-section">
          <h3 className="qrscanner-desc-section-title">Perfect For</h3>
          <div className="qrscanner-desc-audience-grid">
            <div className="qrscanner-desc-audience-card">
              <h4 className="qrscanner-desc-audience-title">Business Owners</h4>
              <p className="qrscanner-desc-audience-text">
                Create QR codes for menus, product information, payment links,
                and customer feedback forms. Track engagement and streamline
                customer interactions.
              </p>
            </div>

            <div className="qrscanner-desc-audience-card">
              <h4 className="qrscanner-desc-audience-title">
                Event Organizers
              </h4>
              <p className="qrscanner-desc-audience-text">
                Generate and scan tickets, manage attendee check-ins, and share
                event details efficiently with QR code technology.
              </p>
            </div>

            <div className="qrscanner-desc-audience-card">
              <h4 className="qrscanner-desc-audience-title">Marketers</h4>
              <p className="qrscanner-desc-audience-text">
                Bridge offline and online campaigns with trackable QR codes on
                print materials, billboards, and promotional items.
              </p>
            </div>

            <div className="qrscanner-desc-audience-card">
              <h4 className="qrscanner-desc-audience-title">Educators</h4>
              <p className="qrscanner-desc-audience-text">
                Share resources, assignments, and supplementary materials with
                students through easily scannable QR codes in classrooms and
                textbooks.
              </p>
            </div>

            <div className="qrscanner-desc-audience-card">
              <h4 className="qrscanner-desc-audience-title">Developers</h4>
              <p className="qrscanner-desc-audience-text">
                Test QR code implementations, debug encoding issues, and quickly
                access development resources and documentation.
              </p>
            </div>

            <div className="qrscanner-desc-audience-card">
              <h4 className="qrscanner-desc-audience-title">Everyday Users</h4>
              <p className="qrscanner-desc-audience-text">
                Scan codes on products for information, connect to WiFi
                networks, save contacts, and access digital content with ease.
              </p>
            </div>
          </div>
        </section>

        <section className="qrscanner-desc-section">
          <h3 className="qrscanner-desc-section-title">How It Works</h3>
          <div className="qrscanner-desc-steps">
            <div className="qrscanner-desc-step">
              <div className="qrscanner-desc-step-number">1</div>
              <div className="qrscanner-desc-step-content">
                <h4 className="qrscanner-desc-step-title">
                  Choose Your Method
                </h4>
                <p className="qrscanner-desc-step-text">
                  Select camera scanning for real-time detection or upload an
                  existing QR code image from your device. For generation, enter
                  your content and customize settings.
                </p>
              </div>
            </div>

            <div className="qrscanner-desc-step">
              <div className="qrscanner-desc-step-number">2</div>
              <div className="qrscanner-desc-step-content">
                <h4 className="qrscanner-desc-step-title">Scan or Generate</h4>
                <p className="qrscanner-desc-step-text">
                  Point your camera at the QR code or click to upload. For
                  generation, click the generate button to create your custom QR
                  code instantly.
                </p>
              </div>
            </div>

            <div className="qrscanner-desc-step">
              <div className="qrscanner-desc-step-number">3</div>
              <div className="qrscanner-desc-step-content">
                <h4 className="qrscanner-desc-step-title">Get Results</h4>
                <p className="qrscanner-desc-step-text">
                  View decoded content immediately or download your generated QR
                  code. Copy text, open links, or save the image for future use.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="qrscanner-desc-section qrscanner-desc-benefits">
          <h3 className="qrscanner-desc-section-title">
            Why Choose Our QR Scanner?
          </h3>
          <div className="qrscanner-desc-benefits-list">
            <div className="qrscanner-desc-benefit-item">
              <span className="qrscanner-desc-benefit-check">✓</span>
              <div className="qrscanner-desc-benefit-content">
                <strong>No Installation Required</strong> - Works directly in
                your browser, no app downloads needed
              </div>
            </div>
            <div className="qrscanner-desc-benefit-item">
              <span className="qrscanner-desc-benefit-check">✓</span>
              <div className="qrscanner-desc-benefit-content">
                <strong>100% Free</strong> - Unlimited scans and generations
                with no hidden costs or subscription fees
              </div>
            </div>
            <div className="qrscanner-desc-benefit-item">
              <span className="qrscanner-desc-benefit-check">✓</span>
              <div className="qrscanner-desc-benefit-content">
                <strong>Offline Capable</strong> - Core functionality works even
                without an internet connection
              </div>
            </div>
            <div className="qrscanner-desc-benefit-item">
              <span className="qrscanner-desc-benefit-check">✓</span>
              <div className="qrscanner-desc-benefit-content">
                <strong>Cross-Platform</strong> - Compatible with all modern
                browsers and devices
              </div>
            </div>
            <div className="qrscanner-desc-benefit-item">
              <span className="qrscanner-desc-benefit-check">✓</span>
              <div className="qrscanner-desc-benefit-content">
                <strong>No Ads or Tracking</strong> - Clean interface focused
                solely on functionality
              </div>
            </div>
            <div className="qrscanner-desc-benefit-item">
              <span className="qrscanner-desc-benefit-check">✓</span>
              <div className="qrscanner-desc-benefit-content">
                <strong>High Accuracy</strong> - Advanced algorithms ensure
                reliable scanning even with damaged or low-quality codes
              </div>
            </div>
          </div>
        </section>

        <section className="qrscanner-desc-section qrscanner-desc-tips">
          <h3 className="qrscanner-desc-section-title">
            Pro Tips for Best Results
          </h3>
          <div className="qrscanner-desc-tips-grid">
            <div className="qrscanner-desc-tip">
              <div className="qrscanner-desc-tip-icon">💡</div>
              <p className="qrscanner-desc-tip-text">
                <strong>Good Lighting:</strong> Ensure adequate lighting when
                scanning. Natural light works best, but avoid direct glare on
                the QR code.
              </p>
            </div>
            <div className="qrscanner-desc-tip">
              <div className="qrscanner-desc-tip-icon">💡</div>
              <p className="qrscanner-desc-tip-text">
                <strong>Steady Hand:</strong> Hold your device steady and allow
                the camera to focus. Most codes scan within 1-2 seconds.
              </p>
            </div>
            <div className="qrscanner-desc-tip">
              <div className="qrscanner-desc-tip-icon">💡</div>
              <p className="qrscanner-desc-tip-text">
                <strong>Proper Distance:</strong> Keep the QR code centered in
                the frame and at an appropriate distance - not too close or too
                far.
              </p>
            </div>
            <div className="qrscanner-desc-tip">
              <div className="qrscanner-desc-tip-icon">💡</div>
              <p className="qrscanner-desc-tip-text">
                <strong>Error Correction:</strong> When generating codes, use
                high error correction for codes that might get damaged or worn.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QrCodeScannerDescription;
