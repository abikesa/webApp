'use strict';

var scenarioVector = [1, 0, 0]; // Default to living donors scenario

function selectScenario(scenario) {
  switch (scenario) {
    case 'livingDonors':
      scenarioVector = [1, 0, 0];
      break;
    case 'healthyNonDonors':
      scenarioVector = [0, 1, 0];
      break;
    case 'generalPopulation':
      scenarioVector = [0, 0, 1];
      break;
    default:
      scenarioVector = [1, 0, 0];
  }
}

function calculateMortalityRisk() {
  const beta = [0, 1.468284, 3.291419]; // Beta coefficients for living donors, healthy non-donors, general population
  const s0 = [.9999999, .9949034, .9844462, .9792454]; // Survival probabilities at timepoints 0, 5, 12, 15
  const timePoints = [0, 5, 12, 15];
  const logHR = beta.reduce((acc, curr, index) => acc + (curr * scenarioVector[index]), 0);
  const f0 = s0.map(s => (1 - s) * 100);
  const f1 = f0.map((f, index) => f * Math.exp(logHR));
  const riskResults = timePoints.map((time, index) => `Risk at ${time} years: ${f1[index].toFixed(2)}%`);
  document.getElementById("mortality-risk-results").innerText = riskResults.join('\n');
}

document.getElementById("calculate-risk-button").addEventListener("click", calculateMortalityRisk);

// Add event listener to the dropdown to update the scenarioVector
document.getElementById("scenario-dropdown").addEventListener("change", function() {
  selectScenario(this.value);
});
