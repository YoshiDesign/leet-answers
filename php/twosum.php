function twoSum(nums, target) {
	
	$numToIndex = [];
	
	foreach($nums as $i => $num) {
		$complement = $target - $num;
		if (isset($numToIndex[$complement]) {
			return [$numToIndex[$complement], $i];
		}
		$numToIndex[$num] = $i;
	}
}

print_r(twoSum([6,2,5,7,5,2], 12));
