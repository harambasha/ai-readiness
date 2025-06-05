import React from 'react';
import { ArrowRight, Download, Share2 } from 'lucide-react';
import { Button } from '../common/Button';
import { MATURITY_LEVELS, MaturityLevel } from '../../constants/ui';
import { RESULTS_SECTIONS, RESULTS_COLORS, RESULTS_LAYOUT } from '../../constants/results';

interface ResultsStepProps {
  result: {
    percentage: number;
    maturityLevel: MaturityLevel;
    score: number;
    maxScore: number;
  };
  onRestart: () => void;
  onDownload: () => void;
  onShare: () => void;
}

export function ResultsStep({ result, onRestart, onDownload, onShare }: ResultsStepProps) {
  return (
    <div className={`${RESULTS_LAYOUT.MAX_WIDTH} mx-auto ${RESULTS_LAYOUT.PADDING} pt-20`}>
      <div className="text-center space-y-8">
        <h1 className={`text-4xl sm:text-5xl font-bold text-[${RESULTS_COLORS.TEXT.PRIMARY}]`}>
          {RESULTS_SECTIONS.HEADER.TITLE}
        </h1>
        <p className={`text-xl text-[${RESULTS_COLORS.TEXT.SECONDARY}] max-w-2xl mx-auto`}>
          {RESULTS_SECTIONS.HEADER.SUBTITLE}
        </p>
      </div>

      <div className={`mt-16 grid grid-cols-1 md:grid-cols-2 ${RESULTS_LAYOUT.GRID_GAP}`}>
        <div className={`bg-white ${RESULTS_LAYOUT.CARD_PADDING} ${RESULTS_LAYOUT.BORDER} border-[${RESULTS_COLORS.BORDER}]`}>
          <h3 className={`text-xl font-semibold text-[${RESULTS_COLORS.TEXT.PRIMARY}] mb-4`}>
            {RESULTS_SECTIONS.OVERALL_SCORE.TITLE}
          </h3>
          <div className="flex items-center justify-center space-x-4">
            <div className={`text-6xl font-bold text-[${RESULTS_COLORS.TEXT.ACCENT}]`}>
              {Math.round(result.percentage)}%
            </div>
            <div className="text-2xl font-semibold">
              <span className={MATURITY_LEVELS[result.maturityLevel].color}>
                {result.maturityLevel}
              </span>
            </div>
          </div>
        </div>

        <div className={`bg-white ${RESULTS_LAYOUT.CARD_PADDING} ${RESULTS_LAYOUT.BORDER} border-[${RESULTS_COLORS.BORDER}]`}>
          <h3 className={`text-xl font-semibold text-[${RESULTS_COLORS.TEXT.PRIMARY}] mb-4`}>
            {RESULTS_SECTIONS.DETAILED_BREAKDOWN.TITLE}
          </h3>
          <div className="space-y-4">
            <div>
              <div className={`flex justify-between text-sm text-[${RESULTS_COLORS.TEXT.SECONDARY}] mb-1`}>
                <span>{RESULTS_SECTIONS.DETAILED_BREAKDOWN.SCORE_LABEL}</span>
                <span>{result.score} / {result.maxScore}</span>
              </div>
              <div className={`h-2 bg-[${RESULTS_COLORS.BORDER}] rounded-full overflow-hidden`}>
                <div
                  className={`h-full bg-gradient-to-r from-[${RESULTS_COLORS.GRADIENT.FROM}] to-[${RESULTS_COLORS.GRADIENT.TO}] transition-all duration-500`}
                  style={{ width: `${result.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 ${RESULTS_LAYOUT.GRID_GAP}`}>
        <div className={`bg-white ${RESULTS_LAYOUT.CARD_PADDING} ${RESULTS_LAYOUT.BORDER} border-[${RESULTS_COLORS.BORDER}]`}>
          <h3 className={`text-xl font-semibold text-[${RESULTS_COLORS.TEXT.PRIMARY}] mb-4`}>
            {RESULTS_SECTIONS.NEXT_STEPS.TITLE}
          </h3>
          <ul className={`space-y-4 text-[${RESULTS_COLORS.TEXT.SECONDARY}]`}>
            {RESULTS_SECTIONS.NEXT_STEPS.ITEMS.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={`bg-white ${RESULTS_LAYOUT.CARD_PADDING} ${RESULTS_LAYOUT.BORDER} border-[${RESULTS_COLORS.BORDER}]`}>
          <h3 className={`text-xl font-semibold text-[${RESULTS_COLORS.TEXT.PRIMARY}] mb-4`}>
            {RESULTS_SECTIONS.RESOURCES.TITLE}
          </h3>
          <ul className={`space-y-4 text-[${RESULTS_COLORS.TEXT.SECONDARY}]`}>
            {RESULTS_SECTIONS.RESOURCES.ITEMS.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={`bg-white ${RESULTS_LAYOUT.CARD_PADDING} ${RESULTS_LAYOUT.BORDER} border-[${RESULTS_COLORS.BORDER}]`}>
          <h3 className={`text-xl font-semibold text-[${RESULTS_COLORS.TEXT.PRIMARY}] mb-4`}>
            {RESULTS_SECTIONS.SUPPORT.TITLE}
          </h3>
          <ul className={`space-y-4 text-[${RESULTS_COLORS.TEXT.SECONDARY}]`}>
            {RESULTS_SECTIONS.SUPPORT.ITEMS.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <Button onClick={onRestart} variant="PRIMARY">
          Start Over
        </Button>
        <Button onClick={onDownload} variant="SECONDARY">
          Download Report
        </Button>
        <Button onClick={onShare} variant="SECONDARY">
          Share Results
        </Button>
      </div>
    </div>
  );
} 