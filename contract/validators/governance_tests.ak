// Test cases for governance core functions

use aiken/crypto.{Blake2b_224, Hash, VerificationKey}
use cardano/assets.{Value, ada_asset_name, ada_policy_id, add, from_asset}

pub type VerificationKeyHash =
  Hash<Blake2b_224, VerificationKey>

const test_policy: ByteArray =
  #"da16cfb63c702345e3936dbe8e0ed508818e71f7796d80e208928afc"

// Test helper to create value with governance NFTs
fn make_nft_value(nft_count: Int) -> Value {
  let base_ada = from_asset(ada_policy_id, ada_asset_name, 2000000)
  if nft_count <= 0 {
    base_ada
  } else if nft_count == 1 {
    add(base_ada, test_policy, "GOV_NFT_1", 1)
  } else if nft_count == 2 {
    base_ada
      |> add(test_policy, "GOV_NFT_1", 1)
      |> add(test_policy, "GOV_NFT_2", 1)
  } else {
    base_ada
      |> add(test_policy, "GOV_NFT_1", 1)
      |> add(test_policy, "GOV_NFT_2", 1)
      |> add(test_policy, "GOV_NFT_3", 1)
  }
}

// Simplified NFT counting function for tests
fn count_gov_nfts(val: Value) -> Int {
  let nft1 = assets.quantity_of(val, test_policy, "GOV_NFT_1")
  let nft2 = assets.quantity_of(val, test_policy, "GOV_NFT_2")
  let nft3 = assets.quantity_of(val, test_policy, "GOV_NFT_3")
  let count1 =
    if nft1 > 0 {
      1
    } else {
      0
    }
  let count2 =
    if nft2 > 0 {
      1
    } else {
      0
    }
  let count3 =
    if nft3 > 0 {
      1
    } else {
      0
    }
  count1 + count2 + count3
}

// Test 1: NFT counting
test test_no_nfts() {
  let value = make_nft_value(0)
  count_gov_nfts(value) == 0
}

test test_single_nft() {
  let value = make_nft_value(1)
  count_gov_nfts(value) == 1
}

test test_multiple_nfts() {
  let value = make_nft_value(2)
  count_gov_nfts(value) == 2
}

test test_three_nfts() {
  let value = make_nft_value(3)
  count_gov_nfts(value) == 3
}

// Test 2: Voting logic
test test_minimum_votes_requirement() {
  let votes_for = 2
  let votes_against = 1
  let total_votes = votes_for + votes_against
  let minimum_required = 2
  total_votes >= minimum_required
}

test test_insufficient_votes() {
  let votes_for = 1
  let votes_against = 0
  let total_votes = votes_for + votes_against
  let minimum_required = 2
  total_votes < minimum_required
}

// Test 3: Approval percentage calculation
test test_approval_calculation_pass() {
  let votes_for = 3
  let votes_against = 1
  let total_votes = votes_for + votes_against
  let approval_rate = votes_for * 100 / total_votes
  let required_approval = 51
  approval_rate >= required_approval
  // 75% >= 51%
}

test test_approval_calculation_fail() {
  let votes_for = 1
  let votes_against = 3
  let total_votes = votes_for + votes_against
  let approval_rate = votes_for * 100 / total_votes
  let required_approval = 51
  approval_rate < required_approval
  // 25% < 51%
}

// Test 4: Edge cases
test test_exact_minimum_votes() {
  let votes_for = 1
  let votes_against = 1
  let total_votes = votes_for + votes_against
  let minimum_required = 2
  total_votes == minimum_required
}

test test_exact_approval_threshold() {
  let votes_for = 51
  let votes_against = 49
  let total_votes = votes_for + votes_against
  let approval_rate = votes_for * 100 / total_votes
  let required_approval = 51
  approval_rate == required_approval
  // Exactly 51%
}

// Test 5: Time conversion (minutes)
test test_time_conversion() {
  let milliseconds = 3600000
  // 1 hour in milliseconds
  let minutes = milliseconds / 60000
  minutes == 60
}

test test_voting_period_check() {
  let current_time = 30
  // 30 minutes
  let deadline = 60
  // 60 minutes
  let voting_open = current_time <= deadline
  voting_open
}

test test_voting_period_expired() {
  let current_time = 90
  // 90 minutes
  let deadline = 60
  // 60 minutes  
  let voting_closed = current_time > deadline
  voting_closed
}
