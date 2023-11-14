package com.hermes.talaria.domain.subscription.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hermes.talaria.domain.subscription.dto.ApplySubscriptionRequest;
import com.hermes.talaria.domain.subscription.dto.ManageSubscriptionRequest;
import com.hermes.talaria.domain.subscription.dto.ManageSubscriptionResponse;
import com.hermes.talaria.domain.subscription.dto.SubscriptionDto;
import com.hermes.talaria.domain.subscription.service.SubscriptionService;
import com.hermes.talaria.global.util.ModelMapperUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

	private final SubscriptionService subscriptionService;

	@PostMapping("/user/apply")
	public ResponseEntity<Void> applySubscription(@RequestBody ApplySubscriptionRequest request) {
		SubscriptionDto subscriptionDto = ModelMapperUtil.getModelMapper().map(request, SubscriptionDto.class);
		subscriptionService.applySubscription(subscriptionDto);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/admin")
	public ResponseEntity<List<ManageSubscriptionResponse>> getSubscriptionByStatus(
		@RequestParam String status) {
		// SubscriptionDto subscriptionDto = ModelMapperUtil.getModelMapper().map(request, SubscriptionDto.class);
		// subscriptionService.updateSubscriptionStatus(subscriptionDto);
		List<ManageSubscriptionResponse> response = new ArrayList<>();
		if ("pending".equals(status))
			response.addAll(subscriptionService.getSubscriptionsByStatusIsPending());

		return ResponseEntity.ok().body(response);
	}

	@PatchMapping("/admin")
	public ResponseEntity<Void> manageSubscription(@RequestBody ManageSubscriptionRequest request) {
		SubscriptionDto subscriptionDto = ModelMapperUtil.getModelMapper().map(request, SubscriptionDto.class);
		subscriptionService.updateSubscriptionStatus(subscriptionDto);

		return ResponseEntity.ok().build();
	}

	// 일단 리스트업
	// 모든 프로덕트 목록 가져오기( 프로덕트명, 프로덕트 내 api 개수(후순위) ) // 예정
	// 나와 관계가 있는 프로덕트 목록 가져오기 +) status별로 가져오기 // 있음
	// 프로덕트 상세보기 // 있음
	// 나와 프로덕트와의 관계 가져오기 ( subscribe/pending/reject 등.. +)subscriptionId도 같이 ) // 만들어야함
	// 프로덕트 사용신청(사용자)(목적,사용처주소 받아야함) / 승인or거절(관리자) // 만들어야함

}